import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.page.html',
  styleUrls: ['./presentation.page.scss'],
})
export class PresentationPage implements OnInit{

  constructor(private socket: WebsocketService) { }

  gyro = {
    alpha: 0,
    beta: 0,
    gamma: 0,
  }

  listener
  throttle = false;
  throttletickrate = 60;

  gyroActive = false

  ngOnInit(){
    document.getElementById('gyroToggle').addEventListener('touchstart', () => {
      this.gyroActive = true
    })
    document.getElementById('gyroToggle').addEventListener('touchend', () => {
      this.gyroActive = false
    })
  }

  ngAfterViewInit() {
    this.startGyro()
  }

  startGyro() {
    window.addEventListener("deviceorientation", this.listener = (event) => {
      if (!this.throttle) {
        this.gyro.alpha = event.alpha
        this.gyro.beta = event.beta
        this.gyro.gamma = event.gamma

        this.sendGyroData()

        this.throttle = true;
        setTimeout(() => { this.throttle = false }, 1000 / this.throttletickrate);
      }
    });
  }

  sendGyroData() {
    if (this.gyroActive) {
      let data = { type: "gyro", data: this.gyro }
      this.socket.sendData(data)
    }
  }

  sendData(key){
      let data = { type: "keypress", data: key }
      this.socket.sendData(data)
  }

  ngOnDestroy() {
    window.removeEventListener("deviceorientation", this.listener)
  }

}
