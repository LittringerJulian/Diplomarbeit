import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { QrscannerComponent } from '../qrscanner/qrscanner.component';


@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss']
})
export class DialogBodyComponent implements OnInit {

  public allowed;

  constructor(public dialogRef: MatDialogRef<QrscannerComponent>) { }

  ngOnInit() {
  }
  
  allow(allowed){
    this.allowed=allowed;
  }
}
