import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

declare var Hammer: any

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
  

  lastPos = {
    x: -1,
    y: -1
  }
  timeofTouch = [-1, -1]
  multiTouch = false
  scrollingMode = 0
  allowedDelay = 200

  mayDrag = false
  dragging = false
  canMove = true
  canClick = true
  justRightclicked = false

  ngOnInit() {
    window.addEventListener('touchstart', this.listenerTouchStart = (e) => {

      if (e.touches[0]) {
          if (this.timeofTouch[0] != -1 && e.timeStamp - this.timeofTouch[0] < this.allowedDelay * 2) {
            this.mayDrag = true
            this.canMove = true
            this.sendData("plslog", "testtest")
          }

          this.timeofTouch[0] = e.timeStamp
      }
      if (e.touches[1]) {
        this.timeofTouch[1] = e.timeStamp
        this.multiTouch = true
      }
      this.lastPos.x = e.touches[0].screenX
      this.lastPos.y = e.touches[0].screenY
  })
  window.addEventListener('touchend', this.listenerTouchEnd = (e) => {

      if (this.canClick && e.timeStamp - this.timeofTouch[1] < this.allowedDelay) {
        this.sendData('clickMouse', 'right')
        this.justRightclicked = true
          setTimeout(() => {
              this.justRightclicked = false
          }, this.allowedDelay)
      } else if (!this.justRightclicked && !this.dragging && this.canClick && this.timeofTouch[0] != -1 && e.timeStamp - this.timeofTouch[0] < this.allowedDelay) {
          if (!this.dragging)
          this.sendData('clickMouse', 'left')
      }
      setTimeout(() => {
        this.timeofTouch[0] = -1
      }, this.allowedDelay * 2)
      this.timeofTouch[1] = -1

      if (this.dragging) {
        this.sendData('toggleMouse', 'up')
      }


      this.scrollingMode = 0
      this.lastPos.x = -1
      this.lastPos.y = -1
      this.mayDrag = false
      this.dragging = false
      this.multiTouch = false
      this.canClick = true
  })
  window.addEventListener('touchmove', this.listenerTouchMove = (e) => {
      if (this.lastPos.x != -1) {
        this.canClick = false
          if (e.touches.length == 1) {
              if (this.mayDrag) {
                this.mayDrag = false
                this.dragging = true
                this.sendData('toggleMouse', 'down')
              }
              this.sendData('moveMouse', {
                  x: Math.floor(e.touches[0].screenX - this.lastPos.x),
                  y: Math.floor(e.touches[0].screenY - this.lastPos.y)
              });
          } else {
              if (this.scrollingMode == 0) {
                  let scrollX, scrollY
                  scrollX = Math.abs(Math.floor(e.touches[0].screenX - this.lastPos.x))
                  scrollY = Math.abs(Math.floor(e.touches[0].screenY - this.lastPos.y))
                  this.scrollingMode = scrollX > scrollY ? 1 : 2
                  this.canMove = false
              }
              if (this.scrollingMode == 1) {
                this.sendData('scrollMouse', {
                      x: Math.floor(e.touches[0].screenX - this.lastPos.x),
                      y: 0
                  });
              }
              if (this.scrollingMode == 2) {
                this.sendData('scrollMouse', {
                      x: 0,
                      y: Math.floor(e.touches[0].screenY - this.lastPos.y)
                  });
              }

          }
      }
      this.lastPos.x = e.touches[0].screenX
      this.lastPos.y = e.touches[0].screenY
  })
  }
  sendData(type, input) {
    let data = { type: type, data: input }
    console.log(data);

    this.socket.sendData(data)
  }

  ngOnDestroy() {
    window.removeEventListener("touchstart", this.listenerTouchStart)
    window.removeEventListener("touchmove", this.listenerTouchMove)
    window.removeEventListener("touchend", this.listenerTouchEnd)
  }

}
