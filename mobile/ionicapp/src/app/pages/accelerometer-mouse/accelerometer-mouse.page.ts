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

  acceleration = {
    x: 0,
    y: 0,
    z: 0,
    timestamp: 0
  }


  ngAfterViewInit() {
    this.startAccelerometer()
  }


  startAccelerometer() {
    window.addEventListener("devicemotion", event => {

      this.acceleration.x = event.acceleration.x
      this.acceleration.y = event.acceleration.y
      this.acceleration.z = event.acceleration.z
      this.acceleration.timestamp = event.timeStamp

      console.log("acceleration below: ");
      console.log(this.acceleration.x, this.acceleration.y, this.acceleration.z, this.acceleration.timestamp);
      

      this.sendAccelerometerData()
    }, true);
  }

  sendAccelerometerData() {
    let data = {type: "acceleration", data: this.acceleration}
    console.log("sending acceleration data");
    
    this.socket.sendData(data)
  }

}
