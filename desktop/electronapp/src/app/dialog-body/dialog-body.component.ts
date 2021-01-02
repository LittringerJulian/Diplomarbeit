import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { QrscannerComponent } from '../qrscanner/qrscanner.component';

declare var electron: any;

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss']
  
})

export class DialogBodyComponent implements OnInit {

  //public allowed;

  constructor(public dialogRef: MatDialogRef<DialogBodyComponent>,private router: Router,private ngZone: NgZone) { }

  ngOnInit() {
  }
  
  allow(allowed){
    //this.allowed=allowed;
    //electron.ipcRenderer.send("requestPermission", allowed);

    if(allowed==true){
      this.ngZone.run(() => {
      this.dialogRef.close(allowed);
    });
    }
    else{
      this.ngZone.run(() => {
        this.dialogRef.close(allowed);
      });

    }

}
}