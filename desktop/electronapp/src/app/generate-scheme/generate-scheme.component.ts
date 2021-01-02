import { Component, HostListener, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Element } from '../element';
import { HttpService } from '../http.service';
import { Scheme } from '../scheme';
import { MatDialog } from '@angular/material';
import { SchemeNameComponent } from '../scheme-name/scheme-name.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColorEvent } from 'ngx-color';
import { Color } from 'ngx-color';



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
  selectedComponent: Element

  /*ButtonElement: Element = new Element("button", "", 250, 250);
  ButtonW: Element = new Element("button", "W", 100, 100);
  ButtonE: Element = new Element("button", "E", 400, 400);
  Joystick: Element = new Element("joystick", "", 200, 200);*/

  newScheme: Scheme = new Scheme();

  contentWidth;
  contentHeight;
  el: HTMLElement


  constructor(private httpService: HttpService, public dialog: MatDialog, formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.el = document.getElementById('scheme');
    this.contentHeight = this.el.offsetHeight;
    this.contentWidth = this.el.offsetWidth;
  }

  selectComponent(e) {
    this.selectedComponent = e
  }

  changeColor($event: ColorEvent) {

    let color = $event.color
    this.selectedComponent.color = $event.color
    this.selectedComponent.rgbaColor = "rgba(" + color.rgb.r +","+ color.rgb.g +","+color.rgb.b+","+ color.rgb.a +")"
  }

  addArray(identifier, specification) {
    let color : Color = {hex: "#FFFFFF", hsl: {a: 1, h: 314.70198675496687, l: 1, s: 0}, hsv: {a: 1, h: 314.70198675496687, s: 0, v: 1}, oldHue: 314.70198675496687, rgb: {r: 255, g: 255, b: 255, a: 1}, source: "rgb"}
    let rgbaColor = "rgba(" + color.rgb.r +","+ color.rgb.g +","+color.rgb.b+","+ color.rgb.a +")"
    
    let e = new Element(identifier, specification, this.contentWidth / 2, this.contentHeight / 2, (this.contentWidth / 2) / this.contentWidth, (this.contentHeight / 2) / this.contentHeight, this.elementWidth, this.elementHeight, color,rgbaColor)
    this.array.push(e)
    this.selectComponent(e)
    /*console.log(this.contentHeight )
    this.el = document.getElementById('snavcontent');
    this.contentHeight=this.el.offsetHeight;
    console.log(this.contentHeight )*/
  }

  saveScheme() {

    this.newScheme.content = JSON.stringify(this.array);

    let dialogRef = this.dialog.open(SchemeNameComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result != undefined) {
        this.newScheme.name = result;
        this.newScheme.format = this.format;
        this.httpService.saveScheme(this.newScheme).subscribe(data => {

          console.log(data);
        })
      }

    })

  }
  checkChange() {

    if (this.isChecked) {
      this.elementWidth = 10;
      this.elementHeight = 10;
      this.format = 'Landscape';

      this.array = [];
      this.el.style.width = '80%';

      this.el.style.paddingBottom = 'calc(80%*(9/16))';
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






}
