import { Component, HostListener, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Element } from '../element';
import { HttpService } from '../http.service';
import { Scheme } from '../scheme';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SchemeNameComponent } from '../scheme-name/scheme-name.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-generate-scheme',
  templateUrl: './generate-scheme.component.html',
  styleUrls: ['./generate-scheme.component.scss']
})
export class GenerateSchemeComponent implements OnInit {
  public isMenuOpen: boolean = false;
  formGroup: FormGroup;
  isChecked = true;
  array = []
  elementWidth = 10;
  elementHeight = 10;
  format = 'Landscape';

  /*ButtonElement: Element = new Element("button", "", 250, 250);
  ButtonW: Element = new Element("button", "W", 100, 100);
  ButtonE: Element = new Element("button", "E", 400, 400);
  Joystick: Element = new Element("joystick", "", 200, 200);*/

  newScheme: Scheme = new Scheme();

  contentWidth;
  contentHeight;
  el: HTMLElement
  


  constructor(private httpService: HttpService, public dialog: MatDialog, formBuilder: FormBuilder,private router: Router,private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.el = document.getElementById('scheme');
    this.contentHeight = this.el.offsetHeight;
    this.contentWidth = this.el.offsetWidth;

    console.log(this.contentWidth);

  }



  addArray(identifier, specification) {

    this.array.push(new Element(identifier, specification, this.contentWidth / 2, this.contentHeight / 2, (this.contentWidth / 2) / this.contentWidth, (this.contentHeight / 2) / this.contentHeight, this.elementWidth, this.elementHeight))

    console.log(this.array[0])
    console.log(this.array[1])

    /*console.log(this.contentHeight )
    this.el = document.getElementById('snavcontent');
    this.contentHeight=this.el.offsetHeight;
    console.log(this.contentHeight )*/


  }

  saveScheme() {
    if(this.array.length>0){
      this.newScheme.content = this.array;

      let dialogRef = this.dialog.open(SchemeNameComponent);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        if (result != undefined) {
          this.newScheme.name = result;
          this.newScheme.format=this.format;
          
          this.httpService.saveScheme(this.newScheme).subscribe(data => {
  
            if(data=="Scheme inserted"){
              this.openSnackbar("Saved Scheme")
            }
          })
        }
  
      })
    }

    else{
      this.openSnackbar("Schem is Empty!")
    }

    

  }
  checkChange() {

    if (this.isChecked) {
      this.elementWidth = 10;
      this.elementHeight = 10;
      this.format = 'Landscape';

      this.array = [];
      this.el.style.width = '70%';

      this.el.style.paddingBottom = 'calc(70%*(9/16))';
      this.contentHeight = this.el.offsetHeight;
      this.contentWidth = this.el.offsetWidth;
    }
    else {
      this.elementWidth = 20;
      this.elementHeight = 20;
      this.format = 'Portrait';

      this.array = [];
      this.el.style.width = '25%';

      this.el.style.paddingBottom = 'calc(25%*(16/9))';

      this.contentHeight = this.el.offsetHeight;
      this.contentWidth = this.el.offsetWidth;
    }
  }



  home(){
    this.router.navigate(['/qrcode']);
  }

  openSnackbar(Message){
    this.snackBar.open(Message, '', {
      duration: 3000,
      panelClass: ['simple-snack-bar']
    });
  }

}
