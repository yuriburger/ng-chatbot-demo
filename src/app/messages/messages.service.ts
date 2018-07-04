import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { User } from "../users/user.model";
import { Thread } from "../threads/thread.model";
import { Message } from "../messages/message.model";

const initialMessages: Message[] = [];

interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}

@Injectable()
export class MessagesService {
  newMessages: Subject<Message> = new Subject<Message>();

  messages: Observable<Message[]>;

  updates: Subject<any> = new Subject<any>();

  create: Subject<Message> = new Subject<Message>();

  markThreadAsRead: Subject<any> = new Subject<any>();

  constructor() {}
}
