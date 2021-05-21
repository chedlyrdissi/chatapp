import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chatui';
  public rooms: string[];

  constructor(private actroute: ActivatedRoute, private router: Router) {
  	this.rooms = [];
  }

  ngOnInit(): void {
    this.actroute.queryParams.subscribe((param) => {
      if(param.room?.length > 1) {
        this.updateRooms(param.room);
      } else if(param.room?.length == 1) {
        this.updateRooms([param.room]);
      }
    });
  }
  
  updateRooms(rooms: string[]) {
    this.rooms = rooms;
  }
  
  addRoom(roomid) {
    if(!this.rooms.includes(roomid)) {
    	this.rooms.push(roomid);
      this.updateQueryParams();
    }
    return false;
  }

  updateQueryParams() {
    this.router.navigate([], {
      relativeTo: this.actroute,
      queryParams: { room: this.rooms },
      queryParamsHandling: "merge",
      preserveFragment: true 
    });
  }

  removeRoom(roomid) {
  	this.rooms.splice(this.rooms.indexOf(roomid), 1);
    this.updateQueryParams();
  } 
}
