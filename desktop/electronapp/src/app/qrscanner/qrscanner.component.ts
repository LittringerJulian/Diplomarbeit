import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

declare var electron: any;

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.scss']
})
export class QrscannerComponent  {

  public qrcode:string = null;
  public qrcodeset=false;

  public elementType: "img" | "url" | "canvas" | "svg" ;
  public level: "L" | "M" | "Q" | "H";
  public scale: number;
  public width: number;
  public ip : string =null;

  constructor() {
    electron.ipcRenderer.send("requestLocalIp", "req");
    electron.ipcRenderer.on("sendLocalIp", (e, arg) => {
      console.log(arg);
      this.qrcodeset=true;
      this.qrcode=arg;
      console.log(this.qrcode);


    })


 
  this.elementType = "canvas";
  this.level = "L";
  this.scale = 1;
  this.width = 512;
   }
}
