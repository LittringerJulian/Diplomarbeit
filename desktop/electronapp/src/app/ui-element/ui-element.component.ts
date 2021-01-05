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
  scheme: HTMLElement

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
  oldPosX = 0
  oldPosY = 0

  @Output() selectComponent = new EventEmitter<Element>()

  constructor() { }

  @HostListener('window:mouseup', ['$event'])
  reenableDragging() {
    if (this.resizing) {

      let scheme = document.getElementById("scheme")
      
      this.element.posx = this.getElementPosX()
      this.element.posy = this.getElementPosY()
      this.element.width = this.getElementWidth()
      this.element.height = this.getElementHeight()

      this.checkDimensions()

      this.element.percentagex = this.round(this.element.posx / scheme.offsetWidth, 2)
      this.element.percentagey = this.round(this.element.posy / scheme.offsetHeight, 2)

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
        if (this.resizeTranslateX || this.resizeTranslateY) {
          /*if (this.resizeTranslateX) {
            this.resizeDifferenceX = this.resizeDifferenceY = this.round(greaterValue / scheme.offsetWidth * 100, 2)
          }*/


          /*if (this.resizeTranslateY) {

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
          this.resizeDifferenceX = this.round(this.resizeDifferenceX_px / scheme.offsetWidth * 100, 2)
          this.resizeDifferenceY = this.round(this.resizeDifferenceY_px / scheme.offsetWidth * 100, 2)
          console.log("buggy buggy");

        } else {
          this.resizeDifferenceX = this.round(greaterValue / scheme.offsetWidth * 100, 2)
          this.resizeDifferenceY = this.round(greaterValue / scheme.offsetWidth * 100, 2)
        }
      }
      else {
        this.resizeDifferenceX = this.round(this.resizeDifferenceX_px / scheme.offsetWidth * 100, 2)
        this.resizeDifferenceY = this.round(this.resizeDifferenceY_px / scheme.offsetWidth * 100, 2)
      }



      //console.log(e.clientX, scheme.offsetWidth);
    }
  }

  checkDimensions() {
    this.element.width = this.element.width > 5 ? this.element.width : 5
    this.element.height = this.element.height > 5 ? this.element.height : 5

    this.element.width = this.element.width > 50 ? 50 : this.element.width
    this.element.height = this.element.height > 50 ? 50 : this.element.height

    if (this.element.posx + this.element.width / 100 * this.contentWidth > this.contentWidth) {
      this.element.width = this.round((this.contentWidth - this.element.posx) / this.contentWidth * 100, 2)
    }
    else if (this.element.posx < 0) {
      this.element.width = this.round((this.contentWidth * this.element.width / 100 + this.element.posx) / this.contentWidth * 100, 2)
      this.element.posx = 0
    }

    if (this.element.posy + this.element.height / 100 * this.contentWidth > this.contentHeight) {
      this.element.height = this.round((this.contentHeight - this.element.posy) / this.contentWidth * 100, 2)
    }
    else if (this.element.posy < 0) {
      this.element.height = this.round((this.contentWidth * this.element.height / 100 + this.element.posy) / this.contentWidth * 100, 2)
      this.element.posy = 0
    }
  }

  getElementWidth() {
    let width
    if (this.resizing) {
      if (this.resizeTranslateX) {
        width = this.element.width - this.resizeDifferenceX
      }
      else {
        width = this.element.width + this.resizeDifferenceX
      }
    }
    else {
      width = this.element.width
    }
    width = this.round(width, 2)

    if (width < 5) width = 5
    if (width > 50) width = 50
    return width
  }

  getElementHeight() {
    let height
    if (this.resizing) {
      if (this.resizeTranslateY) {
        height = this.element.height - this.resizeDifferenceY
      }
      else {
        height = this.element.height + this.resizeDifferenceY
      }
    }
    else {
      height = this.element.height
    }
    height = this.round(height, 2)

    if (height < 5) height = 5
    if (height > 50) height = 50

    return height
  }

  getElementPosX() {
    let posx
    if (this.resizeTranslateX) {
      if (this.getElementWidth() == 50) {
        posx = this.oldPosX
      }
      else {
        posx = this.element.posx + this.resizeDifferenceX_px
      }
    }
    else {
      posx = this.element.posx
    }
    if (this.getElementWidth() == 5) {
      posx = this.oldPosX
    }
    posx = this.round(posx, 2)
    this.oldPosX = posx
    return posx
  }

  getElementPosY() {
    let posy
    if (this.resizeTranslateY) {
      if (this.getElementHeight() == 50) {
        posy = this.oldPosY
      }
      else {
        posy = this.element.posy + this.resizeDifferenceY_px
      }
    }
    else {
      posy = this.element.posy
    }
    if (this.getElementHeight() <= 5) {
      posy = this.oldPosY
    }
    posy = this.round(posy, 2)
    this.oldPosY = posy
    return posy
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
    this.scheme = document.getElementById('scheme');
    this.contentHeight = this.scheme.offsetHeight;
    this.contentWidth = this.scheme.offsetWidth;
  }

  cdkDragReleased(event, item, i) {
    this.contentHeight = this.scheme.offsetHeight;
    this.contentWidth = this.scheme.offsetWidth;
    this.element.posx = event.source.getFreeDragPosition().x;
    this.element.posy = event.source.getFreeDragPosition().y;
    this.element.percentagex = this.round((event.source.getFreeDragPosition().x) / this.contentWidth, 2);
    this.element.percentagey = this.round((event.source.getFreeDragPosition().y) / this.contentHeight, 2);
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
    this.draw(this.scheme.offsetWidth, this.scheme.offsetHeight);
  }

  draw(width: number, height: number) {
    this.element.posx = this.round(width * this.element.percentagex, 2);
    this.element.posy = this.round(height * this.element.percentagey, 2)
  }

}
