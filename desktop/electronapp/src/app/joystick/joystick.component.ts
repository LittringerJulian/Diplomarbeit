import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { UiElementComponent } from '../ui-element/ui-element.component';

@Component({
  selector: 'app-joystick',
  templateUrl: './joystick.component.html',
  styleUrls: ['./joystick.component.scss'],
  host: { '(click)': 'selected()' }
})
export class JoystickComponent  extends UiElementComponent {

  

  constructor() {
    super();
  }
  selected(){
    super.selected()
  }
 

}
