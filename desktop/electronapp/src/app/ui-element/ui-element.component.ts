import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { runAtThisOrScheduleAtNextAnimationFrame } from 'custom-electron-titlebar/lib/common/dom';
import { Element } from '../element';


@Component({
  selector: 'app-ui-element',
  templateUrl: './ui-element.component.html',
  styleUrls: ['./ui-element.component.scss'],
  host: { '(mousedown)': 'selected()' }
})
export class UiElementComponent implements OnInit {

  @Input() element: Element;
  @Input() format: String;
  @Input() isSelected: Boolean = false

  contentWidth;
  contentHeight;
  el: HTMLElement

  resizing = false


  newWidth = 0

  resizeStartX = 0
  resizeStartY = 0
  resizeDifferenceX = 0;
  resizeDifferenceY = 0;
  resizeDifferenceX_px = 0;
  resizeDifferenceY_px = 0;

  resizeTranslateX = false;
  resizeTranslateY = false;

  fixedAspectRatio = false;

  @Output() selectComponent = new EventEmitter<Element>()

  constructor() { }

  @HostListener('window:mouseup', ['$event'])
  reenableDragging() {
    if (this.resizing) {

      this.element.posx = (this.resizeTranslateX ? this.element.posx + this.resizeDifferenceX_px : this.element.posx),
        this.element.posy = (this.resizeTranslateY ? this.element.posy + this.resizeDifferenceY_px : this.element.posy)
      this.element.width = this.getElementWidth()
      this.element.height = this.getElementHeight()

      this.resizeDifferenceX = 0;
      this.resizeDifferenceY = 0;
      this.resizeDifferenceX_px = 0;
      this.resizeDifferenceY_px = 0;
      this.resizeTranslateX = false;
      this.resizeTranslateY = false;
    }
    this.resizing = false;
  }

  @HostListener('window:keydown', ['$event'])
  enableFixedAspectRatio(e: KeyboardEvent) {
    if (e.key == "Shift") {
      this.fixedAspectRatio = true
    }
  }

  @HostListener('window:keyup', ['$event'])
  disableFixedAspectRatio(e: KeyboardEvent) {
    if (e.key == "Shift") {
      this.fixedAspectRatio = false
    }
  }

  @HostListener('window:mousemove', ['$event'])
  resize(e: MouseEvent) {
    if (this.resizing) {
      let scheme = document.getElementById("scheme")
      this.resizeDifferenceX_px = e.clientX - this.resizeStartX
      this.resizeDifferenceY_px = e.clientY - this.resizeStartY
      //this.resizeDifferenceX = (e.clientX - this.resizeStartX) / scheme.offsetWidth * 100
      if (this.fixedAspectRatio) {
        let greaterValue = Math.min(this.resizeDifferenceX_px, this.resizeDifferenceY_px)
        this.resizeDifferenceX_px = greaterValue
        this.resizeDifferenceY_px = greaterValue


        if (this.resizeTranslateX != this.resizeTranslateY) {
          greaterValue = -Math.abs(greaterValue)
          if (this.resizeTranslateY) {
            this.resizeDifferenceX = -Math.round(greaterValue / scheme.offsetWidth * 100 * 100) / 100
            this.resizeDifferenceY = Math.round(greaterValue / scheme.offsetWidth * 100 * 100) / 100
          }
          else {
            this.resizeDifferenceX = Math.round(greaterValue / scheme.offsetWidth * 100 * 100) / 100
            this.resizeDifferenceY = -Math.round(greaterValue / scheme.offsetWidth * 100 * 100) / 100
          }
        } else {
          this.resizeDifferenceX = this.resizeDifferenceY = Math.round(greaterValue / scheme.offsetWidth * 100 * 100) / 100
        }
      }
      else {
        this.resizeDifferenceX = Math.round(this.resizeDifferenceX_px / scheme.offsetWidth * 100 * 100) / 100
        this.resizeDifferenceY = Math.round(this.resizeDifferenceY_px / scheme.offsetWidth * 100 * 100) / 100
      }



      //console.log(e.clientX, scheme.offsetWidth);
    }
  }

  getElementWidth() {
    return Math.round((this.resizing ? (this.resizeTranslateX ? this.element.width - this.resizeDifferenceX : this.element.width + this.resizeDifferenceX) : this.element.width) * 100) / 100
  }

  getElementHeight() {
    return Math.round((this.resizing ? (this.resizeTranslateY ? this.element.height - this.resizeDifferenceY : this.element.height + this.resizeDifferenceY) : this.element.height) * 100) / 100
  }

  resizeStart($event: MouseEvent, translateX, translateY) {
    this.resizing = true;
    this.resizeStartX = $event.clientX
    this.resizeStartY = $event.clientY
    this.resizeTranslateX = translateX
    this.resizeTranslateY = translateY
  }

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
