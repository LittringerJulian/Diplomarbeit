import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/websocket'

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  websocket: any;
  socketUri: string;

  constructor() {

  }

  connect(socketUri) {
    try {
      this.socketUri = "ws://" + socketUri + ":80";
      this.websocket = webSocket(socketUri);

      this.websocket.subscribe((msg) => {
        console.log("msg: " + msg)

      }, (err) => {
        console.log("err: " + err)
      })



    } catch (e) {
      return "Connection failed!";
    }
  }

  //todo
  // .on()
  // .emit()
}
