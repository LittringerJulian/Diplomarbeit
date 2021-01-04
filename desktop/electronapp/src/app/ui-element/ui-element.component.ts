import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Element } from '../element';


@Component({
  selector: 'app-ui-element',
  templateUrl: './ui-element.component.html',
  styleUrls: ['./ui-element.component.scss'],
  host: { '(click)': 'selected()' }
})
export class UiElementComponent implements OnInit {

  @Input() element: Element;
  @Input() format: String;

  contentWidth;
  contentHeight;
  el: HTMLElement

  @Output() selectComponent = new EventEmitter<Element>()

  constructor() { }

  selected() {
    this.selectComponent.emit(this.element)
  }

  ngOnInit() {
    this.el = document.getElementById('scheme');
    this.contentHeight = this.el.offsetHeight;
    this.contentWidth = this.el.offsetWidth;
  }

  cdkDragReleased(event, item, i) {
    this.contentHeight = this.el.offsetHeight;
    this.contentWidth = this.el.offsetWidth;

    //item.posx=event.source.getFreeDragPosition().x;
    //item.posy=event.source.getFreeDragPosition().y;

    this.element.posx = event.source.getFreeDragPosition().x;
    this.element.posy = event.source.getFreeDragPosition().y;
    this.element.percentagex = this.round((event.source.getFreeDragPosition().x) / this.contentWidth, 2);
    this.element.percentagey = this.round((event.source.getFreeDragPosition().y) / this.contentHeight, 2);


    //console.log(this.array[i].posx);

    //console.log(this.array.length)
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

  round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //onsole.log(event.target.innerWidth);
    //console.log(this.el.offsetHeight)
    //this.contentWidth=this.el.offsetWidth;
    this.draw(this.el.offsetHeight, this.el.offsetWidth);
  }

  draw(height: number, width: number) {

    //console.log(height);
    this.element.posx = width * this.element.percentagex;
    //console.log(this.array[i].posx)
    this.element.posy = height * this.element.percentagey;

    //console.log(this.array[i].posx);


  }

}
