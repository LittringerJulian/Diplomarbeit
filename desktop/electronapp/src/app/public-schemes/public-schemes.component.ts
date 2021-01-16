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
import { DataService } from '../data.service';

declare var electron: any;


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
  formattedTags = []
  nameinput

  @ViewChild('tagInput', {static: true}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;


  constructor(private fb: FormBuilder,private httpService: HttpService, private router: Router,private snackBar: MatSnackBar,private loaderService:LoaderService,
    private DataService:DataService) { 

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

   isEmpty(str){
    return str === null || str.match(/^ *$/) !== null;
}


  Search(){


    //this.nameinput = this.nameinput.trim()
    var filterFormat
    var filterTag
    var filterName 

    var filterName
    if(this.nameinput==null){
       filterName = null
    }
    else{
       filterName = this.nameinput.trim()

    }

   
    filterTag = this.tags
    filterFormat=this.searchFormat
    
    if(this.searchFormat==null){
      filterFormat = null
    }
    if(this.searchFormat=='Both'){
      filterFormat = null
    }
    if(this.nameinput!=null){
      if (this.isEmpty(this.nameinput.trim()) == true) {
        filterName = null
      }   
     }
   
    console.log(filterName)

    

    if(this.tags.length==0){
      filterTag= null
    }

    var json = {
      "name":filterName,
      "format":filterFormat,
      "tags":filterTag
    }
    //this.formattedTags = this.tags.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())

    console.log(json);
    
 
    this.array = []
    this.httpService.getFilteredSchemes(json).subscribe(data =>{

      this.array = JSON.parse(data);
    })
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.alltags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  logout() {
    localStorage.setItem('token', null)
    localStorage.setItem('imperiofname', null)
    localStorage.setItem('imperiolname', null)
    localStorage.setItem('imperioemail', null)


    //todo remove connections
    this.DataService.deviceArray = []

    electron.ipcRenderer.send("removeAllConnections");


    this.router.navigate(['/login']);
  }
  scheme() {
    this.router.navigate(['/scheme']);
  }
  myschemes() {
    this.router.navigate(['/myschemes']);
  }
  publicSchemes() {
    this.router.navigate(['/publicschemes']);

  }
  home(){
    this.router.navigate(['/main']);

  }
}
