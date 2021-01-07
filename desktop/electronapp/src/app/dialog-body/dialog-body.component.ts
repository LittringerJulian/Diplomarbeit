import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';

declare var electron: any;

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss']

})

export class DialogBodyComponent implements OnInit {

  //public allowed;
  deviceName

  constructor(public dialogRef: MatDialogRef<DialogBodyComponent>, private router: Router, private ngZone: NgZone) { }

  ngOnInit() {
  }

}