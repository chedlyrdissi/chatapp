import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WebsocketService } from "../chatservice/websocket.service";
import { ChatService } from "../chatservice/chatservice.service";
import { ChatMessage } from '../models';


@Component({
  selector: 'app-chatfield',
  templateUrl: './chatfield.component.html',
  styleUrls: ['./chatfield.component.css']
})
export class ChatfieldComponent implements OnInit {

	private messages: ChatMessage[];
	private chatService: ChatService;

	@Input() roomid: string;

  constructor() {}

  ngOnInit(): void {
    this.chatService = new ChatService(new WebsocketService(), this.roomid || '')
    this.chatService.messages.subscribe(msg => {
      this.messages.push(msg);
      sessionStorage.setItem(`room: ${this.roomid}`, JSON.stringify(this.messages));
    });
    const msgs = sessionStorage.getItem(`room: ${this.roomid}`);
    if(msgs) {
      this.messages = JSON.parse(msgs);
    } else {
      this.messages = [];
    }
  }

 	public getMessages(): ChatMessage[] {
 		return this.messages.slice(0);
 	}

 	public sendMsg(uname:string, message: string) {
 		this.chatService.messages.next({
			source: uname,
      messageType: 'text',
			messageValue: message
    });
 		// return false;
 	}
}
