import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  websocket: any;

  constructor() {

  }

  connect(socketUri) {
    try {
      
      this.websocket = webSocket("ws://" + socketUri + ":80");

      console.log("connected to websocket server");

      this.websocket.subscribe()
      this.sendData("first message")
      
      //this.websocket.next("heee")

      /*this.websocket.subscribe((msg) => {
        console.log("msg: " + msg)

      }, (err) => {
        console.log("err: " + err)
      })
      */
     return true
    } catch (e) {
      return false;
    }
  }


  sendData(data) {
    this.websocket.next(data)
  }

  close(){
    this.websocket.complete()
  }


  //todo
  // .on()
  // .emit()
}
