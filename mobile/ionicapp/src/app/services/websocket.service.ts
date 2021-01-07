import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Scheme } from '../scheme';
import { Device } from '@ionic-native/device/ngx';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  websocket: any;
  socketUri: string;
  receivedSchemes = new BehaviorSubject<Scheme[]>(null)
  canConnect = new BehaviorSubject<Boolean>(false)


  constructor(private router: Router, private device: Device) {
  }

  connect(socketUri) {
    this.websocket = webSocket("ws://" + socketUri + ":80");

    console.log(this.websocket);

    if (this.websocket) {
      this.websocket.subscribe(
        msg => {
          console.log(msg);

          switch (msg.type) {
            case 'schemeList':
              this.receivedSchemes.next(msg.data)
              break;
            case 'allowConnection':
              this.canConnect.next(msg.data)
              break;
          }
        },
        err => {
          console.log(err);
          this.close()
          this.router.navigate(["/", "connectToDesktop"])
          this.canConnect.next(false)
        });
      this.sendData({ type: "newConnection", data: this.device.model });
    }
    else{
      this.canConnect.next(false)
    }
  }


  sendData(data) {
    this.websocket.next(data)
  }

  close() {
    this.websocket.complete()
  }


  //todo
  // .on()
  // .emit()
}
