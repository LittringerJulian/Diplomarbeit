import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  websocket: any;
  socketUri: string;
  receivedSchemes = new BehaviorSubject("")

  constructor(private router: Router) {
    this.connect("localhost")
  }

  connect(socketUri) {
    try {

      this.websocket = webSocket("ws://" + socketUri + ":80");

      this.websocket.subscribe(msg => {
        console.log(msg);
        
        if(msg.type == "schemeList")
        this.receivedSchemes.next(msg.data)
      })

      // on connection
      this.router.navigate(["/", "home"])

      return true
    } catch (e) {
      return false;
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
