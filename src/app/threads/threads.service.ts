import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject, Observable } from "rxjs";
import { Thread } from "./thread.model";
import { Message } from "../messages/message.model";
import { MessagesService } from "../messages/messages.service";

@Injectable()
export class ThreadsService {
  threads: Observable<{ [key: string]: Thread }>;

  orderedThreads: Observable<Thread[]>;

  currentThread: Subject<Thread> = new BehaviorSubject<Thread>(new Thread());

  currentThreadMessages: Observable<Message[]>;

  constructor(public messagesService: MessagesService) {}
}
