import { Injectable } from '@angular/core';
import { Scheme } from './scheme';

declare var electron: any

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public editScheme : Scheme;
  public editFormat : String;
  firstnameDataService;
  lastnameDataService;
  emailDataService

  
  deviceArray = [];

  allSchemes: Scheme[]

  constructor() {
    electron.ipcRenderer.on("requestSchemePush", (e, ws) => {
      electron.ipcRenderer.send("pushSchemes", ws, this.allSchemes)
    })
  }
}
