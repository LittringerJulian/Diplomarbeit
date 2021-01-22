import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-media-controls',
  templateUrl: './media-controls.page.html',
  styleUrls: ['./media-controls.page.scss'],
})
export class MediaControlsPage implements OnInit {

  constructor(private socket: WebsocketService) { }

  settingVolumeDown = false
  settingVolumeUp = false
  volumeDelay = 100
  i

  ngOnInit() {

    document.getElementById('volDown').addEventListener("touchstart", () => {
      this.settingVolumeDown = true
      this.volumeDown()
      this.i = 0
    })

    document.getElementById('volDown').addEventListener("touchend", () => {
      this.settingVolumeDown = false
    })

    document.getElementById('volUp').addEventListener("touchstart", () => {
      this.settingVolumeUp = true
      this.volumeUp()
      this.i = 0
    })

    document.getElementById('volUp').addEventListener("touchend", () => {
      this.settingVolumeUp = false
    })
  }

 

  volumeDown(){
    if(this.i == 0 || this.i > 5)
    this.sendData('audio_vol_down')
    this.i++

    if(this.settingVolumeDown){
      setTimeout(() => {
        this.volumeDown()
      }, this.volumeDelay)
    }
  }

  volumeUp(){
    if(this.i == 0 || this.i > 5)
    this.sendData('audio_vol_up')
    this.i++

    if(this.settingVolumeUp){
      setTimeout(() => {
        this.volumeUp()
      }, this.volumeDelay)
    }
  }

  sendData(key){
    let data = {type: "keypress", data: key}
    this.socket.sendData(data)
  }
}
