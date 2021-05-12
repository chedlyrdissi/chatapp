import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatui';
  public rooms: string[];

  constructor() {
  	this.rooms = [];
  }

  addRoom(roomid) {
  	this.rooms.push(roomid);
  }

  removeRoom(roomid) {
  	this.rooms.splice(this.rooms.indexOf(roomid), 1);
  }  
}
