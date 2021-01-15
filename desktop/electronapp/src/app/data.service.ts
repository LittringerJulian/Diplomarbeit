import { Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { Scheme } from './scheme';

declare var electron: any

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public editScheme = []
  public editFormat: String;
  firstnameDataService;
  lastnameDataService;
  emailDataService
  isEditing = false
  editingId

  deviceArray = [];

  allSchemes: Scheme[]

  constructor(private ngZone: NgZone, public dialog: MatDialog) {
    electron.ipcRenderer.on("requestSchemePush", (e, ws) => {
      electron.ipcRenderer.send("pushSchemes", ws, this.allSchemes)
    })

    electron.ipcRenderer.on("sendDeviceAccess", (e, ws, deviceName) => {
      this.ngZone.run(() => {
        console.log(ws);
        let ref = this.dialog.open(DialogBodyComponent);
        ref.componentInstance.deviceName = deviceName
        ref.afterClosed().subscribe(result => {
          electron.ipcRenderer.send("WebSocketAccess", ws, result);
          if (result) {
            console.log("add to list", deviceName)
            this.deviceArray.push({ id: ws.id, name: deviceName })
            console.log(this.deviceArray)
          }
        })
      });
    })

    electron.ipcRenderer.on("removeDevice", (e, ws) => {
      this.ngZone.run(() => {
        this.deviceArray.forEach((element, index) => {
          if (element.id == ws.id) {
            this.deviceArray.splice(index, 1)
            console.log(this.deviceArray);
          }
        });
      })
    })

  }



}
