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

  gyroval = {
    alpha: 0,
    beta: 0,
    gamma: 0,
  }

  ngAfterViewInit(){
    this.startGyro()
  }

  startGyro(){
    let options: GyroscopeOptions = {
      frequency: 128
    }
  
    this.gyroscope.watch(options)
     .subscribe((orientation: GyroscopeOrientation) => {
        this.gyroval.alpha = orientation.x
        this.gyroval.beta = orientation.y
        this.gyroval.gamma = orientation.z
        this.sendGyroData()
     });
  }

  sendGyroData(){
    let data = {type: "gyro", data: this.gyroval}
    this.socket.sendData(data)
  }

}
