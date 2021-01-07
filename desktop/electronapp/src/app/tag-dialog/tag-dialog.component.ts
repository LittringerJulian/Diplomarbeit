import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-tag-dialog',
  templateUrl: './tag-dialog.component.html',
  styleUrls: ['./tag-dialog.component.scss']
})
export class TagDialogComponent implements OnInit {

  autocompleteItems = ['Gaming', 'Work', 'Art'];
  items = [];
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredtags: Observable<string[]>;
  tags: string[] = [];
  alltags: string[] = ['Gaming', 'Work', 'Art'];

  name : string;

  @ViewChild('tagInput', {static: true}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  constructor(public dialogRef: MatDialogRef<TagDialogComponent>) { 
    this.filteredtags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.alltags.slice()));
  }

  ngOnInit() {
  }

  save(){
    console.log(this.tags);
    this.dialogRef.close(this.tags);


  }
  
/*public onAdd(item) {
  item.value =  item.value.charAt(0).toUpperCase() + item.value.slice(1).toLowerCase()
  console.log(item.value)
 
  this.items.push(item.value)
}
public onRemove(item) {
  this.items.forEach((element, index) => {
    if(element==item){
      console.log(element,index)
      this.items.splice(index,1)
    }
  });
    
  
}*/

add(event: MatChipInputEvent): void {
  var input = event.input;
  var value = event.value;

 console.log(value)
 console.log(input)

 value =  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
 

 
 if ((value || '').trim()) {
   if(!this.tags.includes(value.trim())){
     this.tags.push(value.trim());
   }
 }

 if (input) {
   input.value = '';
 }

 this.tagCtrl.setValue(null);
}

remove(tag: string): void {
 const index = this.tags.indexOf(tag);

 if (index >= 0) {
   this.tags.splice(index, 1);
 }
}

selected(event: MatAutocompleteSelectedEvent): void {
  console.log(event.option.viewValue)
  if(!this.tags.includes(event.option.viewValue)){
    this.tags.push(event.option.viewValue);
  }
 this.tagInput.nativeElement.value = '';
 this.tagCtrl.setValue(null);
}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.alltags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
}

}
