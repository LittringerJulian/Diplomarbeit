import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-scheme-name',
  templateUrl: './scheme-name.component.html',
  styleUrls: ['./scheme-name.component.scss']
})
export class SchemeNameComponent implements OnInit {

  name : string;
  constructor(public dialogRef: MatDialogRef<SchemeNameComponent>) { }

  ngOnInit() {
  }

  save(){
    console.log(this.name);
    this.dialogRef.close(this.name);


  }


}
