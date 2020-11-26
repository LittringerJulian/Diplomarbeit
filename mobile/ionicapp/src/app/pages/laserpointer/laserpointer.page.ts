import { Component, OnInit } from '@angular/core';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-laserpointer',
  templateUrl: './laserpointer.page.html',
  styleUrls: ['./laserpointer.page.scss'],
})
export class LaserpointerPage implements OnInit {

  constructor(private gyroscope: Gyroscope, private socket: WebsocketService) { }

  gyroval = {
    alpha: 0,
    beta: 0,
    gamma: 1,
  }
  

  throttle = false;
  throttletickrate = 128;

  ngOnInit() {

    
  }

  ngAfterViewInit(){
    this.startGyro()
    //window.addEventListener("deviceorientation", this.handleOrientation, true);
  }


  handleOrientation(event){
    if (!this.throttle) {
      this.gyroval.alpha = Math.floor(event.alpha * 100) / 100;
      this.gyroval.beta = Math.floor(event.beta * 100) / 100;
      this.gyroval.gamma = Math.floor(event.gamma * 100) / 100;

      //console.log(absolute + " / " + alpha + " / " + beta + " / " + gamma);
      //document.getElementById("output").innerHTML = "a: " + this.gyroval.alpha + " <br>b: " + this.gyroval.beta + " <br>g: " + this.gyroval.gamma;

      //moveMouse();

      this.throttle = true;
      setTimeout(function() {
        this.throttle = false;
      }, 1000 / this.throttletickrate);
  }
  }

  startGyro(){

    let options: GyroscopeOptions = {
      frequency: 30
    }
  
  
    this.gyroscope.watch(options)
     .subscribe((orientation: GyroscopeOrientation) => {
        console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);

        this.gyroval.alpha = orientation.x
        this.gyroval.beta = orientation.y
        this.gyroval.gamma = orientation.z

        this.sendGyroData()
     });
  
  }

  sendGyroData(){
    this.socket.sendData(this.gyroval)
  }

}
