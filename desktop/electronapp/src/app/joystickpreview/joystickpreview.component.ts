import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-joystickpreview',
  templateUrl: './joystickpreview.component.html',
  styleUrls: ['./joystickpreview.component.scss']
})
export class JoystickpreviewComponent implements OnInit {


  @Input() element :Element;
  @Input() format : String;
  constructor() { }

  ngOnInit() {
  }

}
