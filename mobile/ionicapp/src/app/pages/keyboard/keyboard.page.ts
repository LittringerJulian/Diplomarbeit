import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.page.html',
  styleUrls: ['./keyboard.page.scss'],
})
export class KeyboardPage {

  constructor(private socket: WebsocketService) { }

  @ViewChild('inputfield') inputfield
  listenerKeyup
  listenerTouchStart
  listenerTouchMove
  listenerTouchEnd
  listenerTouchEndWindow

  lastX = -1
  lastY = -1
  delay = 200
  lastClick = -1
  scrollingMode = 0

  drag = false
  canClick = true
  trackpad: HTMLElement

  ngAfterViewInit() {
    window.addEventListener("keyup", this.listenerKeyup = (e) => {

      let keystring

      switch (e.keyCode) {
        case 8:
          keystring = "backspace"
          this.sendData("keypress", keystring);
          break;
        case 13:
          keystring = "enter"
          this.sendData("keypress", keystring)
          break;
        case 16:
          keystring = "shift"
          break;
        case 32:
          keystring = "space"
          this.sendData("keypress", keystring);
          break;
        case 229:
          keystring = this.inputfield.nativeElement.value
          this.sendData("keytype", keystring);
          break;
        default:
          keystring = e.key
          this.sendData("keytype", keystring);

      }
      this.inputfield.nativeElement.value = ''
    })
    setTimeout(() => {
      this.inputfield.nativeElement.focus()
      this.inputfield.nativeElement.select()
    }, 100)

    window.addEventListener("touchend", this.listenerTouchEndWindow = (e) => {
      e.preventDefault()
      setTimeout(() => {
        this.inputfield.nativeElement.focus()
        this.inputfield.nativeElement.select()
      }, 100)
    })

    this.trackpad = document.getElementById("trackpad")

    this.trackpad.addEventListener('touchstart', this.listenerTouchStart = (e) => {
      if (this.lastClick != -1 && e.timeStamp - this.lastClick < this.delay * 2 && e.touches.length == 1) {
        this.drag = true
        this.sendData('toggleMouse', 'down')
      }
      this.lastClick = e.timeStamp
    })

    this.trackpad.addEventListener('touchend', (e) => {
      if (this.drag) {
        this.drag = false
        this.sendData('toggleMouse', 'up')
      } else if (this.canClick) {
        if (e.timeStamp - this.lastClick < this.delay) {
          if (e.touches.length == 0) {
            this.sendData('clickMouse', 'left')
          } else {
            this.sendData('clickMouse', 'right')
          }
          this.canClick = false
        }
      }

      if (e.touches.length == 0) {
        this.canClick = true
      }

      this.lastX = -1
      this.lastY = -1
      this.scrollingMode = 0
    })

    this.trackpad.addEventListener('touchmove', this.listenerTouchMove = (e) => {
      if (this.lastX != -1) {
        this.canClick = false
        // move
        if (e.touches.length == 1) {
          this.sendData('moveMouse', {
            x: Math.floor(e.touches[0].screenX - this.lastX),
            y: Math.floor(e.touches[0].screenY - this.lastY)
          });
        }
        // scroll
        else {
          if (this.scrollingMode == 0) {
            this.scrollingMode = (e.touches[0].screenX - this.lastX) > (e.touches[0].screenY - this.lastY) * 2 ? 1 : 2
            //canMove = false
          }
          if (this.scrollingMode == 1) {
            this.sendData('scrollMouse', {
              x: Math.floor(e.touches[0].screenX - this.lastX),
              y: 0
            });
          }
          if (this.scrollingMode == 2) {
            this.sendData('scrollMouse', {
              x: 0,
              y: Math.floor(e.touches[0].screenY - this.lastY)
            });
          }
        }
      }
      this.lastX = e.touches[0].screenX
      this.lastY = e.touches[0].screenY
    })
  }


  sendData(type, key) {
    let data = { type: type, data: key }
    this.socket.sendData(data)
  }

  ngOnDestroy() {
    window.removeEventListener("keyup", this.listenerKeyup)
    window.removeEventListener("touchend", this.listenerTouchEndWindow)
  }


}
