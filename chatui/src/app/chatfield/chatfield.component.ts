import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WebsocketService } from "../chatservice/websocket.service";
import { ChatService } from "../chatservice/chatservice.service";
import { ChatMessage } from '../models';
import { faBroadcastTower } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-chatfield',
  templateUrl: './chatfield.component.html',
  styleUrls: ['./chatfield.component.css']
})
export class ChatfieldComponent {

	public broadcasticon = faBroadcastTower;

	private messages: ChatMessage[];
	public message: string;
  public source: string;

	private chatService: ChatService;

	@Input() roomid: string;

  constructor() {
  	this.chatService = new ChatService(new WebsocketService(), this.roomid || '')
  	this.chatService.messages.subscribe(msg => {
  		console.log(msg);
      	this.messages.push(msg);
    });
    
    this.messages = [];
  }

 	public getMessages(): ChatMessage[] {
 		return this.messages.slice(0);
 	}

 	public sendMsg(uname:string, message: string, broadcast: boolean=false) {
 		this.chatService.messages.next({
			source: uname,
      messageType: 'text',
			messageValue: message,
			broadcast: broadcast
    });
 		// return false;
 	}
}
