import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comp',
  templateUrl: './comp.component.html',
  styleUrls: ['./comp.component.css']
})
export class CompComponent implements OnInit {

  public model;

  @Input() par;

  constructor() { }

  ngOnInit(): void {
  }

  public changed(event) {
    console.log("model");
    console.log(this.model);
    console.log(event.target.value);
  }

  public clear() {
    this.model = "";
  }

}
