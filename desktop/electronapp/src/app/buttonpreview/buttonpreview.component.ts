import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttonpreview',
  templateUrl: './buttonpreview.component.html',
  styleUrls: ['./buttonpreview.component.scss']
})
export class ButtonpreviewComponent implements OnInit {
  @Input() element :Element;
  @Input() format : String;


  constructor() { }

  ngOnInit() {
  }

}
