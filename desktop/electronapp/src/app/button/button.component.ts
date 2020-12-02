import { Component, Input, OnInit } from '@angular/core';
import { UiElementComponent } from '../ui-element/ui-element.component';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent extends UiElementComponent {
  
  constructor() {
    super();
  }

 

}
