import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable, NgZone, OnInit, ViewRef, ViewEncapsulation } from '@angular/core';
import { QRCodeErrorCorrectionLevel, QRCodeElementType } from 'angularx-qrcode';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';





declare var electron: any;
@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']

})
export class MainScreenComponent implements OnInit {

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
  isvisible = true;
  qrcodetext: HTMLElement;
  hideimg: HTMLElement;

  imgpath




  constructor(public cd: ChangeDetectorRef, private router: Router, public dialog: MatDialog, private http: HttpService, private dataService: DataService, private ngZone: NgZone) {
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

 
    this.dataService.firstnameDataService = localStorage.getItem('imperiofname');
    this.dataService.lastnameDataService = localStorage.getItem('imperiolname');
    this.dataService.emailDataService = localStorage.getItem('imperioemail');


    this.http.getSchemeByUserId().subscribe(data => {
      
      //console.log(data);
      this.dataService.allSchemes = JSON.parse(data);
      console.log(this.dataService.allSchemes)
     
    })


    electron.ipcRenderer.on("sendDeviceAccess", (e, ws) => {

      this.ngZone.run(() => {
        console.log(ws);
        let ref = this.dialog.open(DialogBodyComponent, ws.id);
        ref.afterClosed().subscribe(result => {
          electron.ipcRenderer.send("WebSocketAccess", ws, result);

          if (result == true) {
            console.log("add to list", ws.id)
            this.dataService.deviceArray.push(ws.id)

            console.log(this.dataService.deviceArray)
          }
        })
      });
    })

    electron.ipcRenderer.on("removeDevice", (e, ws) => {
      this.dataService.deviceArray.forEach((element, index) => {
        if (element == ws.id) {
          this.dataService.deviceArray.splice(index, 1)
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
    this.dataService.deviceArray = []

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
    this.container2 = document.querySelector('#content img');

    console.log(this.container2)

    /*top:50%;
    transform:translate(-50%,-50%);
    left:50%;*/



    this.container2.style.width = "100% "
    //this.container2.style.paddingLeft="5%"; 
    /* this.container2.style.top ="55%"
     this.container2.style.left ="25%"
     this.container2.style.transform="translate(-50%,-50%)"
     this.container2.style.position = "absolute"*/

  }

  kickUser(ws) {
    electron.ipcRenderer.send("kickWs", ws);

  }

  confirmDevice() {
    if (true) {
      // this.router.navigate(['/navigation']);   
    }
  }


  hideQR() {

    this.qrcodetext = document.getElementById("hideqrtxt")
    this.hideimg = document.getElementById("visibilityimg")

    switch (this.isvisible) {

      case true:
        this.container2.style.filter = "blur(8px)"
        this.qrcodetext.innerHTML = "Show QR Code";
        (document.getElementById('visibilityimg') as HTMLImageElement).src = './assets/visibility.svg';
        this.isvisible = false;
        break;
      case false:
        this.container2.style.filter = "none"
        this.qrcodetext.innerHTML = "Hide QR Code";
        (document.getElementById('visibilityimg') as HTMLImageElement).src = './assets/visibility_off.svg';
        this.isvisible = true;
        break;

    }
  }

  home(){
    this.router.navigate(['/main']);

  }
}



