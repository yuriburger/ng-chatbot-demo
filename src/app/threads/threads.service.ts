import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Thread } from './thread.model';
import { Message } from '../messages/message.model';
import { MessagesService } from '../messages/messages.service';
import * as _ from 'lodash';

@Injectable()
export class ThreadsService {
  threads: Observable<{ [key: string]: Thread }>;

  orderedThreads: Observable<Thread[]>;

  currentThread: Subject<Thread> = new BehaviorSubject<Thread>(new Thread());

  currentThreadMessages: Observable<Message[]>;

  constructor(public messagesService: MessagesService) {
    this.threads = messagesService.messages.pipe(
      map((messages: Message[]) => {
        const threads: { [key: string]: Thread } = {};
        // Store the message's thread in our accumulator threads
        messages.map((message: Message) => {
          threads[message.thread.id] =
            threads[message.thread.id] || message.thread;

          // Cache the most recent message for each thread
          const messagesThread: Thread = threads[message.thread.id];
          if (
            !messagesThread.lastMessage ||
            messagesThread.lastMessage.sentAt < message.sentAt
          ) {
            messagesThread.lastMessage = message;
          }
        });
        return threads;
      })
    );

    this.orderedThreads = this.threads.pipe(
      map((threadGroups: { [key: string]: Thread }) => {
        const threads: Thread[] = _.values(threadGroups);
        return _.sortBy(threads, (t: Thread) => t.lastMessage.sentAt).reverse();
      })
    );

    this.currentThreadMessages = combineLatest(
      this.currentThread,
      messagesService.messages,
      (currentThread: Thread, messages: Message[]) => {
        if (currentThread && messages.length > 0) {
          return _
            .chain(messages)
            .filter(
              (message: Message) => message.thread.id === currentThread.id
            )
            .map((message: Message) => {
              message.isRead = true;
              return message;
            })
            .value();
        } else {
          return [];
        }
      }
    );

    this.currentThread.subscribe(this.messagesService.markThreadAsRead);
  }

  setCurrentThread(newThread: Thread): void {
    this.currentThread.next(newThread);
  }
}
