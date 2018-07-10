import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { User } from '../users/user.model';
import { Thread } from '../threads/thread.model';
import { Message } from '../messages/message.model';
import { filter, map, scan, publishReplay, refCount } from 'rxjs/operators';

const initialMessages: Message[] = [];

type IMessagesOperation = (messages: Message[]) => Message[];

@Injectable()
export class MessagesService {
  newMessages: Subject<Message> = new Subject<Message>();

  messages: Observable<Message[]>;

  updates: Subject<any> = new Subject<any>();

  create: Subject<Message> = new Subject<Message>();

  constructor() {
    this.messages = this.updates
      // Watch the updates and accumulate operations on the messages
      .pipe(
        scan((messages: Message[], operation: IMessagesOperation) => {
          return operation(messages);
        }, initialMessages),
        // Allow late subscribers to receive messages
        publishReplay(1),
        refCount()
      );

    // Takes a Message and then puts an operation (the inner function)
    // on the updates stream to add the Message to the list of messages.
    this.create
      .pipe(
        map(function(message: Message): IMessagesOperation {
          return (messages: Message[]) => {
            return messages.concat(message);
          };
        })
      )
      .subscribe(this.updates);

    this.newMessages.subscribe(this.create);
  }

  // Add message to stream
  addMessage(message: Message): void {
    this.newMessages.next(message);
  }

  messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
    return this.newMessages.pipe(
      filter((message: Message) => {
        // Message belongs to this thread
        return (
          message.thread.id === thread.id &&
          // and isn't authored by current user
          message.author.id !== user.id
        );
      })
    );
  }
}
