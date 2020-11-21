import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Element } from '../element';


@Component({
  selector: 'app-generate-scheme',
  templateUrl: './generate-scheme.component.html',
  styleUrls: ['./generate-scheme.component.scss']
})
export class GenerateSchemeComponent implements OnInit {
  public isMenuOpen: boolean = false;

  array = []

  ButtonElement : Element = new Element("button","");
  ButtonW: Element = new Element("button","W");
  ButtonE: Element = new Element("button","E");
  Joystick: Element = new Element("joystick","");


  

  constructor() { }

  ngOnInit() {
    console.log(this.ButtonElement)
  }

 

}
