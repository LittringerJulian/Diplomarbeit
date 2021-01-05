import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { LoaderService } from '../loader/loader.service';
import { Scheme } from '../scheme';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-public-schemes',
  templateUrl: './public-schemes.component.html',
  styleUrls: ['./public-schemes.component.scss']
})
export class PublicSchemesComponent implements OnInit {
  array = [];
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredtags: Observable<string[]>;
  tags: string[] = [];
  alltags: string[] = ['Gaming', 'Work', 'Art'];
  searchFormat;


  @ViewChild('tagInput', {static: true}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;


  constructor(private fb: FormBuilder,private httpService: HttpService, private router: Router,private snackBar: MatSnackBar,private loaderService:LoaderService) { 

    this.filteredtags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.alltags.slice()));
  }
  tempScheme :Scheme;


  ngOnInit() {
   
    this.httpService.getPublicSchemes().subscribe(data => {
      
      this.array = JSON.parse(data);
      console.log(this.array)
     
    })
  }
  home(){
    this.router.navigate(['/qrcode']);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    console.log(value)
    console.log(input)

    
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
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }


  openSnackbar(Message){
    this.snackBar.open(Message, '', {
      duration: 3000,
      panelClass: ['simple-snack-bar']
    });
  }

  insertScheme(item:Scheme){
    console.log(item)
    this.tempScheme= item; 
    this.tempScheme.published=false;
    

    this.httpService.saveScheme(this.tempScheme).subscribe(data => {

      if(data=="Scheme inserted"){
        this.openSnackbar("Downlaoded Scheme")
        
      }
    })
  }


  Search(){

    var filterFormat
    var filterTag

   

    filterTag = this.tags
    filterFormat=this.searchFormat
    
    if(this.searchFormat==null){
      filterFormat = null;
    }
    if(this.searchFormat=='Both'){
      filterFormat = null;
    }

    if(this.tags.length==0){
      filterTag= null
    }

    var json = {
      "format":filterFormat,
      "tags":filterTag
    }

    console.log(json)
 
    this.array = []
    this.httpService.getFilteredSchemes(json).subscribe(data =>{

      this.array = JSON.parse(data);
    })
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.alltags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}
