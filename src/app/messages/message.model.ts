import * as uuid from "uuid";
import { User } from "../users/user.model";
import { Thread } from "../threads/thread.model";

export class Message {
  id: string;
  sentAt: Date;
  isRead: boolean;
  author: User;
  text: string;
  thread: Thread;

  constructor(obj?: any) {
    this.id = (obj && obj.id) || uuid();
    this.isRead = (obj && obj.isRead) || false;
    this.sentAt = (obj && obj.sentAt) || new Date();
    this.author = (obj && obj.author) || null;
    this.text = (obj && obj.text) || null;
    this.thread = (obj && obj.thread) || null;
  }
}
