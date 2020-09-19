import {ChangeDetectorRef, Component, Injectable, Input, OnInit} from '@angular/core';
import {QRCodeModule} from 'angularx-qrcode';

declare var electron: any;

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.scss']
})
@Injectable()
export class QrscannerComponent implements OnInit {

  public qrcode: string = null;
  @Input() qrCodeIsSet = false;

  public
  elementType: "img" | "url" | "canvas" | "svg";
  public level: "L" | "M" | "Q" | "H";
  public scale: number;
  public width: number;
  public ip: string = null;

  constructor(public cd: ChangeDetectorRef) {
    this.elementType = "canvas";
    this.level = "L";
    this.scale = 1;
    this.width = 512;
  }

  ngOnInit() {
    this.cd.markForCheck();
    electron.ipcRenderer.send("requestLocalIp", "req");
    electron.ipcRenderer.on("sendLocalIp", (e, arg) => {
      console.log(arg);
      this.qrcode = arg + "";
      console.log(this.qrcode);
      this.qrCodeIsSet = true;
      this.cd.detectChanges();
      this.cd.detach();
    })
  }
}
