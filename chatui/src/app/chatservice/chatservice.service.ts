import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { WebsocketService } from "./websocket.service";
import { environment } from '../../environments/environment';
// import { environment } from '@env/environment';
import { ChatMessage } from '../models';


const CHAT_URL = environment.relay;

export interface Message {
  message: string;
  type: string;
  broadcast?: boolean;
}

@Injectable()
export class ChatService {
  public messages: Subject<ChatMessage>;

  constructor(ws: WebsocketService, roomid: string) {
    this.messages = <Subject<ChatMessage>> ws.connect(`${CHAT_URL}/${roomid}`).pipe(map(
      (response: MessageEvent): ChatMessage => {
        return JSON.parse(response.data);
      }
    ));
  }
}
