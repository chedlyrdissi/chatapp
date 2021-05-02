import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { WebsocketService } from "./websocket.service";
import { environment } from '../../environments/environment';
// import { environment } from '@env/environment';

const CHAT_URL = environment.relay;

export interface Message {
  message: string;
  type: string;
  broadcast?: boolean;
}

@Injectable()
export class ChatService {
  public messages: Subject<Message>;

  constructor(ws: WebsocketService) {
    this.messages = <Subject<Message>> ws.connect(CHAT_URL).pipe(map(
      (response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          message: data.message, 
          type: data.type
        };
      }
    ));
  }
}
