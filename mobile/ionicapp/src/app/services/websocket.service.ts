import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  websocket: any;
  socketUri: string;

  constructor(private router: Router) {

  }

  connect(socketUri) {
    try {
      
      this.websocket = webSocket("ws://" + socketUri + ":80");
      this.websocket.subscribe()
      this.router.navigate(["/", "home"])
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
