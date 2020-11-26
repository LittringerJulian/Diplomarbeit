import { Component, OnInit } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-accelerometer-mouse',
  templateUrl: './accelerometer-mouse.page.html',
  styleUrls: ['./accelerometer-mouse.page.scss'],
})
export class AccelerometerMousePage {

  constructor(private deviceMotion: DeviceMotion, private socket: WebsocketService) { }

  acceleration /*= {
    x: 0,
    y: 0,
    z: 0,
  }*/


  ngAfterViewInit() {
    this.startAccelerometer()
  }


  startAccelerometer() {
    window.addEventListener("devicemotion", (event) => {
      this.handleAcceleration(event)
    }, true);
  }

  handleAcceleration(event) {
    this.acceleration.x = event.acceleration.x
    this.acceleration.y = event.acceleration.y
    this.acceleration.z = event.acceleration.z

    console.log(this.acceleration);
  }

  sendAccelerometerData() {
    //let data = {type: "gyro", data: this.acceleration}
    //this.socket.sendData(data)
  }

}
