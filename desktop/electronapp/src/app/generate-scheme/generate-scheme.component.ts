import { Component, HostListener, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Element } from '../element';
import { HttpService } from '../http.service';
import { Scheme } from '../scheme';
import { MatDialog } from '@angular/material';
import { SchemeNameComponent } from '../scheme-name/scheme-name.component';


@Component({
  selector: 'app-generate-scheme',
  templateUrl: './generate-scheme.component.html',
  styleUrls: ['./generate-scheme.component.scss']
})
export class GenerateSchemeComponent implements OnInit {
  public isMenuOpen: boolean = false;

  array = []


  /*ButtonElement: Element = new Element("button", "", 250, 250);
  ButtonW: Element = new Element("button", "W", 100, 100);
  ButtonE: Element = new Element("button", "E", 400, 400);
  Joystick: Element = new Element("joystick", "", 200, 200);*/

  newScheme: Scheme = new Scheme();

  element: HTMLElement;
  contentWidth;
  contentHeight;
  el: HTMLElement


  constructor(private httpService: HttpService, public dialog: MatDialog) { }

  ngOnInit() {
    this.el = document.getElementById('snavcontent');
    this.contentHeight = this.el.offsetHeight;
    this.contentWidth = this.el.offsetWidth;

  }

  cdkDragReleased(event, item, i) {

    //item.posx=event.source.getFreeDragPosition().x;
    //item.posy=event.source.getFreeDragPosition().y;

    this.array[i].posx = event.source.getFreeDragPosition().x;
    this.array[i].posy = event.source.getFreeDragPosition().y;
    this.array[i].percentagex = this.round((event.source.getFreeDragPosition().x) / this.el.offsetWidth, 2);
    this.array[i].percentagey = this.round((event.source.getFreeDragPosition().y) / this.el.offsetHeight, 2);


    console.log(this.array[i].posx);

    console.log(this.array.length)




  }

  addArray(identifier, specification) {
    this.array.push(new Element(identifier, specification, this.contentWidth / 2, this.contentHeight / 2, (this.contentWidth / 2) / this.contentWidth, (this.contentHeight / 2) / this.contentHeight))
    this.element = document.getElementById("snavcontent");

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
        this.httpService.saveScheme(this.newScheme).subscribe(data => {

          console.log(data);
        })
      }

    })

  }

  round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //console.log(event.target.innerWidth);
    //console.log(this.el.offsetHeight)
    //this.contentWidth=this.el.offsetWidth;
    this.draw(this.el.offsetHeight, this.el.offsetWidth);
  }

  draw(height: number, width: number) {
    for(let i = 0;i<this.array.length;i++){
      //console.log(height);
      this.array[i].posx=width*this.array[i].percentagex ;
      //console.log(this.array[i].posx)
      this.array[i].posy=height*this.array[i].percentagey ;

      //console.log(this.array[i].posx);

    }
  }

}
