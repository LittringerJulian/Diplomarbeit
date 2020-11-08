import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { QrscannerComponent } from '../qrscanner/qrscanner.component';


@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss']
})
export class DialogBodyComponent implements OnInit {

  public allowed;

  constructor(public dialogRef: MatDialogRef<QrscannerComponent>,private router: Router) { }

  ngOnInit() {
  }
  
  allow(allowed){
    this.allowed=allowed;
    if(allowed==true){
      this.router.navigate(['/navigation']);  

    }
}
}