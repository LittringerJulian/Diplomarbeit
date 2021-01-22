import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-trackpad',
  templateUrl: './trackpad.page.html',
  styleUrls: ['./trackpad.page.scss'],
})

export class TrackpadPage implements OnInit {

  constructor(private socket: WebsocketService) { }

  listenerTouchStart
  listenerTouchMove
  listenerTouchEnd
  listenerClick

  lastX = -1
  lastY = -1
  delay = 200
  lastClick = -1
  scrollingMode = 0

  drag = false
  canClick = true
  trackpad: HTMLElement

  ngOnInit() {
    this.trackpad = document.getElementById("trackpad")

    this.trackpad.addEventListener('touchstart', (e) => {
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

    this.trackpad.addEventListener('touchmove', (e) => {
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
            this.scrollingMode = (e.touches[0].screenX - this.lastX) > (e.touches[0].screenY - this.lastY) ? 1 : 2
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



  sendData(type, input) {
    let data = { type: type, data: input }
    console.log(data);
    
    this.socket.sendData(data)
  }

  ngOnDestroy() {
    //window.removeEventListener("touchstart", this.listenerTouchStart)
    //window.removeEventListener("touchmove", this.listenerTouchMove)
    //window.removeEventListener("touchend", this.listenerTouchEnd)
    window.removeEventListener("touchend", this.listenerClick)
  }

}
