import { Component } from '@angular/core';
import { WebsocketService } from "./chatservice/websocket.service";
import { ChatService } from "./chatservice/chatservice.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WebsocketService, ChatService]
})
export class AppComponent {
  title = 'chatui';
  public msgreceived: string[];
  public msgtosend: string;

  constructor(private chatService: ChatService) {
    this.chatService.messages.subscribe(msg => {
      this.msgreceived.push(msg.message);
      console.log("Response from websocket: " + msg);
    });
    this.msgreceived = []
  }

  sendMsg(broadcast: boolean = false) {
    console.log("new message from client to websocket: ", this.msgtosend);
    this.chatService.messages.next({message: this.msgtosend, type: 'text', broadcast: broadcast});
    return false;
  }
}
