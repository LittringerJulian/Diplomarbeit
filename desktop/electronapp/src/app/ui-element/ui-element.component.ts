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

  oldDiffX = 0
  oldDiffY = 0

  @Output() selectComponent = new EventEmitter<Element>()

  constructor() { }

  @HostListener('window:mouseup', ['$event'])
  reenableDragging() {
    if (this.resizing) {

      this.element.posx = this.getElementPosX()
      this.element.posy = this.getElementPosY()
      this.element.width = this.getElementWidth()
      this.element.height = this.getElementHeight()

      this.resizeDifferenceX = 0;
      this.resizeDifferenceY = 0;
      this.resizeDifferenceX_px = 0;
      this.resizeDifferenceY_px = 0;
      this.resizeTranslateX = false;
      this.resizeTranslateY = false;
      this.oldDiffX = 0
      this.oldDiffY = 0
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
        let greaterValue = Math.max(this.resizeDifferenceX_px, this.resizeDifferenceY_px)

        if (this.resizeTranslateX != this.resizeTranslateY || (this.resizeTranslateX && this.resizeTranslateY)) {/*

          if (this.resizeTranslateY) {
            
            if (this.resizeStartX + greaterValue >= this.resizeStartX && this.resizeStartY - greaterValue <= this.resizeStartY) {
              this.resizeDifferenceX = -Math.round(greaterValue / scheme.offsetWidth * 100 * 100) / 100
              this.resizeDifferenceY = Math.round(greaterValue / scheme.offsetWidth * 100 * 100) / 100
            } else {
              this.resizeDifferenceX = Math.round(greaterValue / scheme.offsetWidth * 100 * 100) / 100
              this.resizeDifferenceY = -Math.round(greaterValue / scheme.offsetWidth * 100 * 100) / 100
            }
          }

          else {
            this.resizeDifferenceX = Math.round(greaterValue / scheme.offsetWidth * 100 * 100) / 100
            this.resizeDifferenceY = -Math.round(greaterValue / scheme.offsetWidth * 100 * 100) / 100
          }

        */
          this.resizeDifferenceX = Math.round(this.resizeDifferenceX_px / scheme.offsetWidth * 100 * 100) / 100
          this.resizeDifferenceY = Math.round(this.resizeDifferenceY_px / scheme.offsetWidth * 100 * 100) / 100
          console.log("buggy buggy");

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

    let width = (Math.round((this.resizing ? (this.resizeTranslateX ? this.element.width - this.resizeDifferenceX : this.element.width + this.resizeDifferenceX) : this.element.width) * 100) / 100)
    return width < 5 ? 5 : width
  }

  getElementHeight() {
    let height = Math.round((this.resizing ? (this.resizeTranslateY ? this.element.height - this.resizeDifferenceY : this.element.height + this.resizeDifferenceY) : this.element.height) * 100) / 100

    return height < 5 ? 5 : height
  }

  getElementPosX() {
    let posx = (this.resizeTranslateX ? this.element.posx + this.resizeDifferenceX_px : this.element.posx)


    if (this.getElementWidth() <= 5) {
      if (this.resizeTranslateY) {
        return this.element.posx
      }
      else{
        return this.element.posx + this.oldDiffX * 2
      }
    }
    else {
      this.oldDiffX = this.resizeDifferenceX_px
      return posx
    }
  }

  getElementPosY() {
    let posy = (this.resizeTranslateY ? this.element.posy + this.resizeDifferenceY_px : this.element.posy)
    if (this.getElementHeight() <= 5) {
      return this.element.posy + this.oldDiffY
    }
    else {
      this.oldDiffY = this.resizeDifferenceY_px
      return posy
    }
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
