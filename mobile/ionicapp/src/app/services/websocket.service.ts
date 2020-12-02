import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';


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
      
      this.websocket = webSocket("ws://" + socketUri + ":80");
      this.websocket.subscribe()

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
