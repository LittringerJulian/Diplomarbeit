import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Scheme } from '../scheme';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  websocket: any;
  socketUri: string;
  receivedSchemes = new BehaviorSubject<Scheme[]>(null)

  constructor(private router: Router) {
    this.connect("localhost")
  }

  connect(socketUri) {
    this.websocket = webSocket("ws://" + socketUri + ":80");

    if (this.websocket) {
      this.websocket.subscribe(
        msg => {
          console.log(msg);
          if (msg.type == "schemeList") {
            let schemes: Scheme[]
            schemes = msg.data
            console.log(schemes);
            this.receivedSchemes.next(schemes)
          }
        },
        err => {
          console.log(err);
          this.close()
        })
      //this.router.navigate(["/", "home"])
      return true;
    }
    else {
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
