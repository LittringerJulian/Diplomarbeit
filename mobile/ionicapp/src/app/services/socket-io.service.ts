import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SocketIOService {

    socket: SocketIOClient.Socket;
    socketUrl: string;
    websocket: any;


    constructor() {

    }

    connect(socketUrl) {
        this.socketUrl = socketUrl;
        this.websocket = new WebSocket("ws://" + socketUrl + ":80")
        this.websocket.onopen = console.log("websocket opened")
    }
}
