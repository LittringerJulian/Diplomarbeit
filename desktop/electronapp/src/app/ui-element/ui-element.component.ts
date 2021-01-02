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
