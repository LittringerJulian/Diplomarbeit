import { ChangeDetectorRef, Component, Injectable, OnInit } from '@angular/core';
import { QRCodeErrorCorrectionLevel, QRCodeElementType } from 'angularx-qrcode';
import { Router } from '@angular/router';


declare var electron: any;

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.scss']
})
@Injectable()
export class QrscannerComponent implements OnInit {

  public qrcode: string = "";
  public qrCodeIsSet = false;

  public elementType: QRCodeElementType;
  public level: QRCodeErrorCorrectionLevel;
  public scale: number;
  public width: number;

  constructor(public cd: ChangeDetectorRef,private router: Router) {
    this.elementType = QRCodeElementType.img;
    this.level = QRCodeErrorCorrectionLevel.M;
    this.scale = 1;
    this.width = 512;
  }

  ngOnInit() {
   
    this.cd.markForCheck();
    electron.ipcRenderer.send("requestLocalIp", "req");
    electron.ipcRenderer.on("sendLocalIp", (e, arg) => {
      this.qrcode = arg;
      this.qrCodeIsSet = true;
      this.cd.detectChanges();
      this.cd.detach();
    })
  }

  logout() {
    localStorage.setItem('token', null)
    this.router.navigate(['/login']);   
  }
}
