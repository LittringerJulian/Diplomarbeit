import { Component, HostListener, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Element } from '../element';
import { HttpService } from '../http.service';
import { Scheme } from '../scheme';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SchemeNameComponent } from '../scheme-name/scheme-name.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ColorEvent, Color } from 'ngx-color';
import { SetComponentActionComponent } from '../set-component-action/set-component-action.component';
import { DomSanitizer, SafeHtml, SafeStyle } from '@angular/platform-browser';



@Component({
  selector: 'app-generate-scheme',
  templateUrl: './generate-scheme.component.html',
  styleUrls: ['./generate-scheme.component.scss']
})
export class GenerateSchemeComponent implements OnInit {
  public isMenuOpen: boolean = false;
  formGroup: FormGroup;
  isChecked = true;
  components = []
  elementWidth = 10;
  elementHeight = 10;
  format = 'Landscape';
  selectedComponent: Element

  nameButtonLabelText = ""

  /*ButtonElement: Element = new Element("button", "", 250, 250);
  ButtonW: Element = new Element("button", "W", 100, 100);
  ButtonE: Element = new Element("button", "E", 400, 400);
  Joystick: Element = new Element("joystick", "", 200, 200);*/

  newScheme: Scheme = new Scheme();

  contentWidth;
  contentHeight;
  el: HTMLElement

  predefinedColors = ["#9C27B0", "#E91E63", "#f44336", "#ff9800", "#ffeb3b", "#03a9f4", "#4caf50", "#F0F0F0", "#000000"]
  customColor: SafeStyle = "FFFFFF"
  rippleColor = "rgba(0,0,0,0.2)"



  constructor(private sanitizer: DomSanitizer, private httpService: HttpService, public dialog: MatDialog, formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.el = document.getElementById('scheme');
    this.contentHeight = this.el.offsetHeight;
    this.contentWidth = this.el.offsetWidth;
  }

  deselectComponent(e) {
    if (e.target.id == "scheme" || e.target.id == "snavcontent")
      this.selectedComponent = null
  }

  selectComponent(e) {
    this.selectedComponent = e
  }

  setColor(color) {
    let newColor = { hex: color, hsl: { a: 1, h: 314.70198675496687, l: 1, s: 0 }, hsv: { a: 1, h: 314.70198675496687, s: 0, v: 1 }, oldHue: 314.70198675496687, rgb: { r: 255, g: 255, b: 255, a: 1 }, source: "rgb" }
    this.selectedComponent.color = newColor
    this.selectedComponent.rgbaColor = color
  }

  getTextColor() {
    if (this.selectedComponent.color.rgb.a > 0.6) {
    let hex = this.selectedComponent.color.hex
    hex = hex.replace("#", '');

    let r = parseInt(hex.substr(0, 2), 16)
    let g = parseInt(hex.substr(2, 2), 16)
    let b = parseInt(hex.substr(4, 2), 16)

    let mean = (r + g + b) / 3
    return mean > 155 ? "#000000" : "#FFFFFF"
    }
    else return "#000000"
  }

  changeColor($event: ColorEvent) {
    let color = $event.color
    this.selectedComponent.color = $event.color
    this.selectedComponent.rgbaColor = "rgba(" + color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + "," + color.rgb.a + ")"

    let temp = $event.color.hex
    this.customColor = $event.color.hex
  }

  addArray(identifier, specification) {
    let color: Color = { hex: "#FFFFFF", hsl: { a: 1, h: 314.70198675496687, l: 1, s: 0 }, hsv: { a: 1, h: 314.70198675496687, s: 0, v: 1 }, oldHue: 314.70198675496687, rgb: { r: 255, g: 255, b: 255, a: 1 }, source: "rgb" }
    let rgbaColor = "rgba(" + color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + "," + color.rgb.a + ")"
    let e = new Element(identifier, specification, this.contentWidth / 2, this.contentHeight / 2, (this.contentWidth / 2) / this.contentWidth, (this.contentHeight / 2) / this.contentHeight, this.elementWidth, this.elementHeight, color, rgbaColor, [true, "W"], false)
    this.components.push(e)
    this.selectComponent(e)
    /*console.log(this.contentHeight )
    this.el = document.getElementById('snavcontent');
    this.contentHeight=this.el.offsetHeight;
    console.log(this.contentHeight )*/
  }

  setComponentAction() {
    let dialogRef = this.dialog.open(SetComponentActionComponent)
    dialogRef.componentInstance.shortcut = this.selectedComponent.shortcut
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);

      if (res)
        this.selectedComponent.shortcut = res

    })
  }

  saveScheme() {
    if (this.components.length > 0) {
      this.newScheme.content = this.components;

      let dialogRef = this.dialog.open(SchemeNameComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        if (result != undefined) {
          this.newScheme.name = result;
          this.newScheme.format = this.format;
          this.httpService.saveScheme(this.newScheme).subscribe(data => {

            if (data == "Scheme inserted") {
              this.openSnackbar("Saved Scheme")
            }
          })
        }
      })
    }
    else {
      this.openSnackbar("Scheme is Empty")
    }
  }
  checkChange() {

    if (this.isChecked) {
      this.elementWidth = 10;
      this.elementHeight = 10;
      this.format = 'Landscape';

      this.components = [];
      this.el.style.width = '70%';

      this.el.style.paddingBottom = 'calc(70%*(9/16))';
      this.contentHeight = this.el.offsetHeight;
      this.contentWidth = this.el.offsetWidth;
    }
    else {
      this.elementWidth = 20;
      this.elementHeight = 20;
      this.format = 'Portrait';

      this.components = [];
      this.el.style.width = '25%';

      this.el.style.paddingBottom = 'calc(25%*(16/9))';

      this.contentHeight = this.el.offsetHeight;
      this.contentWidth = this.el.offsetWidth;
    }
  }



  home() {
    this.router.navigate(['/qrcode']);
  }

  openSnackbar(Message) {
    this.snackBar.open(Message, '', {
      duration: 3000,
      panelClass: ['simple-snack-bar']
    });
  }

}
