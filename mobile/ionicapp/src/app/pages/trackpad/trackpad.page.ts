import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-trackpad',
  templateUrl: './trackpad.page.html',
  styleUrls: ['./trackpad.page.scss'],
})
export class TrackpadPage implements OnInit {

  constructor(private socket: WebsocketService) { }


  oldX
  oldY
  lasttouch
  multitouch
  listenerTouchMove
  listenerTouchEnd
  listenerTouchStart

  ngOnInit() {

        window.addEventListener("touchmove", this.listenerTouchMove = (e) => {
            if (this.oldX && !this.multitouch) {
              this.sendData("moveMouse", {
                    x: e.touches[0].screenX - this.oldX,
                    y: e.touches[0].screenY - this.oldY
                });
            }
            this.oldX = e.touches[0].screenX
            this.oldY = e.touches[0].screenY
        })

        window.addEventListener("touchstart", this.listenerTouchEnd = (e) => {
            if (e.touches[1]) {
                this.multitouch = true
            }
            this.lasttouch = e.timeStamp
        })

        window.addEventListener("touchend", this.listenerTouchEnd = (e) => {
            if (this.oldX) {
              this.oldX = this.oldY = null
            } else if (e.timeStamp - this.lasttouch < 200) {
                if (this.multitouch) {
                  this.sendData('clickMouse', 'right')
                    this.multitouch = false
                    this.lasttouch = null
                } else {
                  this.sendData('clickMouse', 'left')
                  this.lasttouch = null
                }
            } else {
              this.lasttouch = null
            }
        })
  }

  sendData(type, input) {
    let data = { type: type, data: input }
    this.socket.sendData(data)
  }

  ngOnDestroy() {
    window.removeEventListener("touchstart", this.listenerTouchStart)
    window.removeEventListener("touchend", this.listenerTouchEnd)
    window.removeEventListener("touchmove", this.listenerTouchMove)
  }



}
