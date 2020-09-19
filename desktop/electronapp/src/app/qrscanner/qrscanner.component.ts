import { Component, OnInit } from '@angular/core';

declare var electron: any;

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.scss']
})
export class QrscannerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    electron.ipcRenderer.send("requestLocalIp", "req");
    electron.ipcRenderer.on("sendLocalIp", (e, arg) => {
      console.log(arg)
    })
  }

}
