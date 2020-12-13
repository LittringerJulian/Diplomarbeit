import { Component, OnInit } from '@angular/core';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-laserpointer',
  templateUrl: './laserpointer.page.html',
  styleUrls: ['./laserpointer.page.scss'],
})
export class LaserpointerPage {

  constructor(private gyroscope: Gyroscope, private socket: WebsocketService) { }

  gyro = {
    alpha: 0,
    beta: 0,
    gamma: 0,
  }

  listener
  throttle = false;
  throttletickrate = 60;

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
    let data = { type: "gyro", data: this.gyro }
    this.socket.sendData(data)
  }

  ngOnDestroy() {
    window.removeEventListener("deviceorientation", this.listener)
  }

}
