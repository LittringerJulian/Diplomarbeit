import { Component, Input, OnInit } from '@angular/core';

import { Element } from '../../element';

@Component({
  selector: 'app-button-element',
  templateUrl: './button-element.component.html',
  styleUrls: ['./button-element.component.scss'],
})
export class ButtonElementComponent implements OnInit {

  @Input() element: Element;

  constructor() { }

  ngOnInit() { 
  }

  getTextColor() {
    if (this.element.color.rgb.a > 0.6) {
      let hex = this.element.color.hex
      hex = hex.replace("#", '');
      let r = parseInt(hex.substr(0, 2), 16)
      let g = parseInt(hex.substr(2, 2), 16)
      let b = parseInt(hex.substr(4, 2), 16)
      let mean = (r + g + b) / 3
      return mean > 155 ? "#000000" : "#FFFFFF"
    }
    else return "#000000"
  }

  getWidth() {
    return this.element.width
  }

  getHeight() {
    return this.element.height
  }

  getLeft() {
    return this.element.percentagex * 100
  }

  getTop() {
    return this.element.percentagey * 100
  }
}
