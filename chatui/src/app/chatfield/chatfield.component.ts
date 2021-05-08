import { Component, OnInit } from '@angular/core';
import { WebsocketService } from "../chatservice/websocket.service";
import { ChatService } from "../chatservice/chatservice.service";
import { ChatMessage } from '../models';


@Component({
  selector: 'app-chatfield',
  templateUrl: './chatfield.component.html',
  styleUrls: ['./chatfield.component.css'],
  providers: [WebsocketService, ChatService]
})
export class ChatfieldComponent {

	private cons = [			{
				source: "chedli",
				messageType: "text",
				messageValue: "text1"
			},
			{
				source: "chedli2",
				messageType: "text",
				messageValue: "text2"
			},
			{
				source: "chedli",
				messageType: "text",
				messageValue: "text3"
			},
			{
				source: "chedli2",
				messageType: "text",
				messageValue: "text4"
			},
			{
				source: "chedli",
				messageType: "text",
				messageValue: "text5"
			},
			{
				source: "chedli",
				messageType: "text",
				messageValue: "text6"
			}];

	private messages: ChatMessage[];
	public message: string;

  constructor(private chatService: ChatService) {

  	this.chatService.messages.subscribe(msg => {
  		console.log(msg);
      	this.messages.push(msg);
    });
    
    this.messages = [];
  }

 	public getMessages(): ChatMessage[] {
 		return this.messages.slice(0);
 	}

 	public sendMsg(message: string, broadcast: boolean=false) {
 		this.chatService.messages.next({
			messageType: 'text',
			messageValue: message,
			broadcast: broadcast
    });
 		// return false;
 	}
}
