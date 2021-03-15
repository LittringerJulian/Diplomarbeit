import { Component, HostListener, OnInit } from '@angular/core';
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
import { DataService } from '../data.service';

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
  copiedComponent: Element
  fixedAspectRatio = false;

  /*ButtonElement: Element = new Element("button", "", 250, 250);
  ButtonW: Element = new Element("button", "W", 100, 100);
  ButtonE: Element = new Element("button", "E", 400, 400);
  Joystick: Element = new Element("joystick", "", 200, 200);*/

  newScheme: Scheme = new Scheme();

  contentWidth;
  contentHeight;
  scheme: HTMLElement

  predefinedColors = ["#9C27B0", "#E91E63", "#f44336", "#ff9800", "#ffeb3b", "#03a9f4", "#4caf50", "#F0F0F0", "#000000"]
  customColor: SafeStyle = "FFFFFF"
  rippleColor = "rgba(0,0,0,0.2)"

  ctrlPressed = false
  shortcutsEnabled = true

  oldWidth = 0
  oldHeight = 0

  badgeContent = '<span class="material-icons">check</span>'

  constructor(private dataService: DataService, private httpService: HttpService, public dialog: MatDialog, formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.scheme = document.getElementById('scheme');
    this.contentHeight = this.scheme.offsetHeight;
    this.contentWidth = this.scheme.offsetWidth;

    if (this.dataService.isEditing == true) {
      if (this.dataService.editFormat == "Landscape") {
        this.elementWidth = 10;
        this.elementHeight = 10;
        this.format = 'Landscape';

        this.components = this.dataService.editScheme
        this.scheme.style.width = '70%';

        this.scheme.style.paddingBottom = 'calc(70%*(9/16))';
        this.contentHeight = this.scheme.offsetHeight;
        this.contentWidth = this.scheme.offsetWidth;


      }
      if (this.dataService.editFormat == "Portrait") {

        this.elementWidth = 20;
        this.elementHeight = 20;
        this.format = 'Portrait';

        this.components = this.dataService.editScheme
        this.scheme.style.width = '25%';

        this.scheme.style.paddingBottom = 'calc(25%*(16/9))';

        this.contentHeight = this.scheme.offsetHeight;
        this.contentWidth = this.scheme.offsetWidth;


      }
      for (let i = 0; i < this.components.length; i++) {
        this.components[i].posx = this.components[i].percentagex * this.contentWidth;
        this.components[i].posy = this.components[i].percentagey * this.contentHeight;
      }
    }
    //this.contentHeight = this.scheme.offsetHeight;
    //this.contentWidth = this.scheme.offsetWidth;
  }

  setDimensions(isX) {
    if (isX) {
      if (this.selectedComponent.posx + this.selectedComponent.width / 100 * this.contentWidth > this.contentWidth) {
        this.selectedComponent.width = this.round((this.contentWidth - this.selectedComponent.posx) / this.contentWidth * 100, 2)
      }
      if (this.fixedAspectRatio) {
        this.setHeightWithAspectRatio()
      }
    }
    else {
      if (this.selectedComponent.posy + this.selectedComponent.height / 100 * this.contentWidth > this.contentHeight) {
        this.selectedComponent.height = this.round((this.contentHeight - this.selectedComponent.posy) / this.contentWidth * 100, 2)
      }
      if (this.fixedAspectRatio) {
        this.setWidthWithAspectRatio()
      }
    }

    this.selectedComponent.width = this.selectedComponent.width < 5 ? 5 : this.selectedComponent.width
    this.selectedComponent.height = this.selectedComponent.height < 5 ? 5 : this.selectedComponent.height

    this.selectedComponent.width = this.selectedComponent.width > 50 ? 50 : this.selectedComponent.width
    this.selectedComponent.height = this.selectedComponent.height > 50 ? 50 : this.selectedComponent.height
  }

  setHeightWithAspectRatio() {
    let newHeight = this.round(this.oldHeight * this.selectedComponent.width / this.oldWidth, 2)

    let toobig = this.selectedComponent.posy + this.contentWidth * newHeight / 100 > this.contentHeight
    let maxHeight = (this.contentHeight - this.selectedComponent.posy) / this.contentWidth * 100

    this.selectedComponent.height = this.round(toobig ? maxHeight : newHeight, 2)
  }

  setWidthWithAspectRatio() {
    let newWidth = this.round(this.oldWidth * this.selectedComponent.height / this.oldHeight, 2)
    let toobig = this.selectedComponent.posx + this.contentWidth * newWidth / 100 > this.contentWidth
    let maxWidth = (this.contentWidth - this.selectedComponent.posx) / this.contentWidth * 100

    this.selectedComponent.width = this.round(toobig ? maxWidth : newWidth, 2)
  }

  checkDimensions() {
    if (this.selectedComponent) {
      this.selectedComponent.width = this.selectedComponent.width > 5 ? this.selectedComponent.width : 5
      this.selectedComponent.height = this.selectedComponent.height > 5 ? this.selectedComponent.height : 5

      this.selectedComponent.width = this.selectedComponent.width < 50 ? this.selectedComponent.width : 50
      this.selectedComponent.height = this.selectedComponent.height < 50 ? this.selectedComponent.height : 50

      this.selectedComponent.posx = this.round(this.scheme.offsetWidth * this.selectedComponent.percentagex, 2);
      this.selectedComponent.posy = this.round(this.scheme.offsetHeight * this.selectedComponent.percentagey, 2);
    }
  }

  log(e) {
    console.log(e)
  }

  deselectComponent(e) {
    if (e.target.id == "scheme" || e.target.id == "snavcontent")
      if (this.selectedComponent) {
        //this.checkDimensions()
        this.selectedComponent = null
      }
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

  deleteSelectedComponent() {
    if (this.selectedComponent) {
      this.components.splice(this.components.indexOf(this.selectedComponent), 1)
    }
  }

  @HostListener('window:keydown', ['$event'])
  listenOnKeydown(e: KeyboardEvent) {
    if (this.shortcutsEnabled) {
      if (e.key.toLocaleLowerCase() == "control") {
        this.ctrlPressed = true
      }

      if (e.key.toLocaleLowerCase() == "delete") {
        this.deleteSelectedComponent()
      }

      if (e.key.toLocaleLowerCase() == "c" && this.ctrlPressed && this.selectedComponent) {
        this.copiedComponent = Object.create(Object.getPrototypeOf(this.selectedComponent), Object.getOwnPropertyDescriptors(this.selectedComponent));
      }

      if (e.key.toLocaleLowerCase() == "v" && this.ctrlPressed && this.copiedComponent) {
        let newComponent: Element = Object.create(Object.getPrototypeOf(this.copiedComponent), Object.getOwnPropertyDescriptors(this.copiedComponent));
        newComponent.posx = newComponent.posx - 10 >= 0 ? newComponent.posx - 10 : newComponent.posx + 10
        newComponent.posy = newComponent.posy - 10 >= 0 ? newComponent.posy - 10 : newComponent.posy + 10
        newComponent.percentagex = this.round(newComponent.posx / this.scheme.offsetWidth, 2)
        newComponent.percentagey = this.round(newComponent.posy / this.scheme.offsetHeight, 2)
        this.components.push(newComponent)
        this.selectComponent(newComponent)
      }

      if (this.selectedComponent) {
        let fraction = this.contentHeight < this.contentWidth ? this.contentHeight : this.contentWidth
        let multiplier = this.ctrlPressed ? 10 : 100
        let newpos
        if (e.key.toLocaleLowerCase() == "arrowup") {
          newpos = this.selectedComponent.posy - fraction / multiplier
          this.selectedComponent.posy = newpos > 0 ? newpos : 0

        }
        if (e.key.toLocaleLowerCase() == "arrowleft") {
          newpos = this.selectedComponent.posx - fraction / multiplier
          this.selectedComponent.posx = newpos > 0 ? newpos : 0
        }
        if (e.key.toLocaleLowerCase() == "arrowright") {
          newpos = this.selectedComponent.posx + fraction / multiplier
          this.selectedComponent.posx = newpos + this.contentWidth * this.selectedComponent.width / 100 < this.contentWidth ? newpos : this.contentWidth - this.contentWidth * this.selectedComponent.width / 100
        }
        if (e.key.toLocaleLowerCase() == "arrowdown") {
          newpos = this.selectedComponent.posy + fraction / multiplier
          this.selectedComponent.posy = newpos + this.contentWidth * this.selectedComponent.height / 100 < this.contentHeight ? newpos : this.contentHeight - this.contentWidth * this.selectedComponent.height / 100
        }
        this.selectedComponent.percentagex = this.round(this.selectedComponent.posx / this.scheme.offsetWidth, 2)
        this.selectedComponent.percentagey = this.round(this.selectedComponent.posy / this.scheme.offsetHeight, 2)
      }
    }
  }

  @HostListener('window:keyup', ['$event'])
  listenOnKeyup(e: KeyboardEvent) {
    if (e.key.toLocaleLowerCase() == "control") this.ctrlPressed = false
  }

  changeColor($event: ColorEvent) {
    let color = $event.color
    this.selectedComponent.color = $event.color
    this.selectedComponent.rgbaColor = "rgba(" + color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + "," + color.rgb.a + ")"

    let temp = $event.color.hex
    this.customColor = $event.color.hex
  }

  addArray(identifier, specification) {
    let hex = this.predefinedColors[Math.floor(Math.random() * this.predefinedColors.length)]
    hex = hex.replace("#", '');

    let r = parseInt(hex.substr(0, 2), 16)
    let g = parseInt(hex.substr(2, 2), 16)
    let b = parseInt(hex.substr(4, 2), 16)

    hex = "#" + hex

    let color: Color = { hex: hex, hsl: { a: 1, h: 314.70198675496687, l: 1, s: 0 }, hsv: { a: 1, h: 314.70198675496687, s: 0, v: 1 }, oldHue: 314.70198675496687, rgb: { r: r, g: g, b: b, a: 1 }, source: "rgb" }
    let rgbaColor = "rgba(" + color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + "," + color.rgb.a + ")"
    let e = new Element(identifier, specification, this.contentWidth / 2, this.contentHeight / 2, (this.contentWidth / 2) / this.contentWidth, (this.contentHeight / 2) / this.contentHeight, this.elementWidth, this.elementHeight, color, rgbaColor, identifier == 'button' ? [true, "W", "W"] : [true, "W | A | S | D", "W", "A", "S", "D"], false)
    this.components.push(e)
    this.selectComponent(e)

    this.checkDimensions()
    /*console.log(this.contentHeight )
    this.scheme = document.getElementById('snavcontent');
    this.contentHeight=this.scheme.offsetHeight;
    console.log(this.contentHeight )*/
  }

  getBadgeIcon(color) {
    return this.selectedComponent.color.hex == this.predefinedColors[color] ? '✓' : ''
  }

  isColorPredefined() {
    for (let color of this.predefinedColors) {
      if (color == this.selectedComponent.color.hex) return ''
    }
    return '✓';
  }

  setComponentAction() {
    this.shortcutsEnabled = false

    let dialogRef = this.dialog.open(SetComponentActionComponent)
    dialogRef.componentInstance.shortcut = this.selectedComponent.shortcut
    dialogRef.componentInstance.type = this.selectedComponent.identifier
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);

      if (res) {
        this.selectedComponent.shortcut = res
      }
      this.shortcutsEnabled = true
    })
  }

  saveScheme() {
    this.shortcutsEnabled = false
    if (this.dataService.isEditing == false) {
      console.log("isNotEditing")

      if (this.components.length > 0) {
        this.newScheme.content = this.components;

        let dialogRef = this.dialog.open(SchemeNameComponent);

        dialogRef.afterClosed().subscribe(result => {
          console.log(result)
          this.shortcutsEnabled = true
          if (result != undefined) {
            this.newScheme.name = result;
            this.newScheme.format = this.format;
            this.httpService.saveScheme(this.newScheme).subscribe(data => {

              if (data == "Scheme inserted") {
                this.dataService.isEditing = false
                this.openSnackbar("Saved Scheme")
              }
              // pull schemes
              this.httpService.getSchemeByUserId().subscribe(data => {
                this.dataService.allSchemes = JSON.parse(data);
              })
            })
          }
        })
      }
      else {
        this.openSnackbar("Scheme is Empty")
      }
    }
    if (this.dataService.isEditing == true) {
      console.log("isEditing")


      var scheme = {
        "_id": this.dataService.editingId,
        "content": this.components,

      }

      this.httpService.updateScheme(scheme).subscribe(data => {

        if (data == "updated") {
          this.dataService.isEditing = false
          this.router.navigate(['/myschemes']);
        }


      })

    }
  }
  checkChange() {

    if (this.isChecked) {
      this.elementWidth = 10;
      this.elementHeight = 10;
      this.format = 'Landscape';

      this.components = [];
      this.scheme.style.width = '85%';

      this.scheme.style.paddingBottom = 'calc(85%*(9/16))';
      this.contentHeight = this.scheme.offsetHeight;
      this.contentWidth = this.scheme.offsetWidth;
    }
    else {
      this.elementWidth = 20;
      this.elementHeight = 20;
      this.format = 'Portrait';

      this.components = [];
      this.scheme.style.width = '40%';

      this.scheme.style.paddingBottom = 'calc(40%*(16/9))';

      this.contentHeight = this.scheme.offsetHeight;
      this.contentWidth = this.scheme.offsetWidth;
    }
  }

  round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  home() {
    this.dataService.isEditing = false
    this.router.navigate(['/qrcode']);
  }

  openSnackbar(Message) {
    this.snackBar.open(Message, '', {
      duration: 3000,
      panelClass: ['simple-snack-bar']
    });
  }

}
