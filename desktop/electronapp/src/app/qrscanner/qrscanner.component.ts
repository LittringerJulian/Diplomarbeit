import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable, OnInit, ViewRef } from '@angular/core';
import { QRCodeErrorCorrectionLevel, QRCodeElementType } from 'angularx-qrcode';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';





declare var electron: any;

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.scss']
})
@Injectable()
export class QrscannerComponent implements OnInit {


  public qrcode;
  public qrCodeIsSet;
  public scanset = false;


  public elementType: QRCodeElementType;
  public level: QRCodeErrorCorrectionLevel;
  public scale: number;
  public width: number;



  constructor(public cd: ChangeDetectorRef, private router: Router, public dialog: MatDialog) {
    this.elementType = QRCodeElementType.img;
    this.level = QRCodeErrorCorrectionLevel.M;
    this.scale = 1;
    this.width = 512;
  }

  ngOnDestroy() {

    this.cd.detach();

  }

  ngAfterViewInit() {
    this.cd.markForCheck();
    electron.ipcRenderer.send("requestLocalIp", "req");
    electron.ipcRenderer.on("sendLocalIp", (e, arg) => {

      this.qrcode = arg;
      this.qrCodeIsSet = true;
      if (!(this.cd as ViewRef).destroyed) {
        this.cd.detectChanges()
        // do other tasks
      }

    })
  }
  ngOnInit() {

  

    //this.cd.detach();

    electron.ipcRenderer.on("sendDeviceAccess", (e, ws) => {
      console.log(ws);
      let ref = this.dialog.open(DialogBodyComponent, ws);
      ref.afterClosed().subscribe(result => {
        console.log(result);
        electron.ipcRenderer.send("WebSocketAccess", ws, result);

      })



    })

  }





  logout() {
    localStorage.setItem('token', null)
    this.router.navigate(['/login']);
  }
  scheme() {
    this.router.navigate(['/scheme']);
  }
  openscheme() {
    this.router.navigate(['/open']);
  }
  myschemes() {
    this.router.navigate(['/myschemes']);
  }


  scanned() {

  }

  confirmDevice() {
    if (true) {
      // this.router.navigate(['/navigation']);   
    }
  }
}
