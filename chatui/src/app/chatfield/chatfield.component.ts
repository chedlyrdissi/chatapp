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
  private disabled: boolean;
  public page = 0;
  public par = "";

	@Input() roomid: string;

  constructor() {
    this.disabled = false;
  }

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

  public getDisabled(): boolean {
    return this.disabled;
  }

  public toggle(): void {
    this.disabled = !this.disabled;
    console.log(this.disabled);
  }

  public textchange(event) {
    console.log(event);
    console.log(event.srcElement.files);
  }

  public testsubmit(event) {
    event.preventDefault()
    console.log(event);
  }

  public inc() {
    this.page += 1;
  }

  public dec() {
    this.page -= 1;    
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
