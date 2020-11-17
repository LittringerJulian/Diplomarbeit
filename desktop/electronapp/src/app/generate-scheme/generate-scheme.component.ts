import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-generate-scheme',
  templateUrl: './generate-scheme.component.html',
  styleUrls: ['./generate-scheme.component.scss']
})
export class GenerateSchemeComponent implements OnInit {
  public isMenuOpen: boolean = false;

  array = []

  constructor() { }

  ngOnInit() {
  }

 

}
