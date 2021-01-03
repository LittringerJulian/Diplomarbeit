import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable, NgZone, OnInit, ViewRef } from '@angular/core';
import { QRCodeErrorCorrectionLevel, QRCodeElementType } from 'angularx-qrcode';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { DataService } from '../data.service';





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


  fname: String;
  lname: String;
  email: String;
  container: HTMLCanvasElement

  container2: HTMLElement;




  constructor(public cd: ChangeDetectorRef, private router: Router, public dialog: MatDialog, private DataService: DataService, private ngZone: NgZone) {
    this.elementType = QRCodeElementType.img;
    this.level = QRCodeErrorCorrectionLevel.M;
    this.scale = 1;
    this.width = 500;
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
    setTimeout(() => this.getQrCode(), 0)

  }
  ngOnInit() {


    this.fname = localStorage.getItem('imperiofname')
    this.lname = localStorage.getItem('imperiolname')
    this.email = localStorage.getItem('imperioemail')


    electron.ipcRenderer.on("sendDeviceAccess", (e, ws) => {

      this.ngZone.run(() => {
        console.log(ws);
        let ref = this.dialog.open(DialogBodyComponent, ws.id);
        ref.afterClosed().subscribe(result => {
          electron.ipcRenderer.send("WebSocketAccess", ws, result);

          if (result == true) {
            console.log("add to list", ws.id)
            this.DataService.DeviceArary.push(ws.id)

            console.log(this.DataService.DeviceArary)
          }

        })
      });

    })


    electron.ipcRenderer.on("removeDevice", (e, ws) => {
      this.DataService.DeviceArary.forEach((element, index) => {
        if (element == ws.id) {
          this.DataService.DeviceArary.splice(index, 1)
          if (!(this.cd as ViewRef).destroyed) {
            this.cd.detectChanges()
            // do other tasks

          }


        }
      });

    })

  }





  logout() {
    localStorage.setItem('token', null)
    localStorage.setItem('imperiofname', null)
    localStorage.setItem('imperiolname', null)
    localStorage.setItem('imperioemail', null)


    //todo remove connections
    this.DataService.DeviceArary = []

    electron.ipcRenderer.send("removeAllConnections");


    this.router.navigate(['/login']);
  }
  scheme() {
    this.router.navigate(['/scheme']);
  }
  myschemes() {
    this.router.navigate(['/myschemes']);
  }
  publicSchemes() {
    this.router.navigate(['/publicschemes']);

  }


  getQrCode() {
    //this.container = document.querySelector('img');
    this.container2 = document.querySelector('img');

    console.log(this.container)
    console.log(this.container2)

    /*top:50%;
    transform:translate(-50%,-50%);
    left:50%;*/


    
    this.container2.style.width = "40% " 
    this.container2.style.top ="55%"
    this.container2.style.left ="25%"
    this.container2.style.transform="translate(-50%,-50%)"
    this.container2.style.position = "absolute"

  }

<<<<<<< Updated upstream
    this.container2.style.height = "100% ";
    this.container2.style.width = "100% ";
=======
  kickUser(ws){
    electron.ipcRenderer.send("kickWs",ws);
>>>>>>> Stashed changes

  }

  confirmDevice() {
    if (true) {
      // this.router.navigate(['/navigation']);   
    }
  }
}
