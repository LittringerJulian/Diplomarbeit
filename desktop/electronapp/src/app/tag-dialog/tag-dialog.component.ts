import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-tag-dialog',
  templateUrl: './tag-dialog.component.html',
  styleUrls: ['./tag-dialog.component.scss']
})
export class TagDialogComponent implements OnInit {

  autocompleteItems = ['Gaming', 'Work', 'Art'];
  items = [];

  name : string;
  constructor(public dialogRef: MatDialogRef<TagDialogComponent>) { }

  ngOnInit() {
  }

  save(){
    console.log(this.items);
    this.dialogRef.close(this.items);


  }
  
public onAdd(item) {
 
  this.items.push(item.value)
}
public onRemove(item) {
  this.items.forEach((element, index) => {
    if(element==item){
      console.log(element,index)
      this.items.splice(index,1)
    }
  });
    
  
}
}
