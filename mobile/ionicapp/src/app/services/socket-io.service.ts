import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SocketIOService {

    socket: SocketIOClient.Socket;
    socketUrl: string;

    constructor() {

    }

    connect(socketUrl) {
        this.socketUrl = socketUrl;
        try {
            console.log(this.socketUrl);
            this.socket = io(socketUrl);
            console.log("socket: " + this.socket);
        } catch (e) {
            console.log("connection failed");
        }
    }

    listen(eventName: string) {
        return new Observable((subscriber => {
            this.socket.on(eventName, (data) => {
                subscriber.next(data);
            })
        }))
    }

    emit(eventName: string, data: any) {
        this.socket.emit(eventName, data);
    }
}
