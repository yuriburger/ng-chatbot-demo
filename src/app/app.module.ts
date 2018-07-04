import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatButtonModule,
  MatInputModule
} from '@angular/material';

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MessagesService } from './messages/messages.service';
import { ThreadsService } from './threads/threads.service';
import { UsersService } from './users/users.service';
import { FormsModule } from '@angular/forms';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { FromNowPipe } from './from-now.pipe';

@NgModule({
  declarations: [AppComponent, ChatMessageComponent, FromNowPipe],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [MessagesService, ThreadsService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule {}
