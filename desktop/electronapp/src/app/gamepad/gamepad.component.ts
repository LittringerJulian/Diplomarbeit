import { Component, OnInit } from '@angular/core';
import { UiElementComponent } from '../ui-element/ui-element.component';

@Component({
  selector: 'app-gamepad',
  templateUrl: './gamepad.component.html',
  styleUrls: ['./gamepad.component.scss'],
  host: { '(click)': 'selected()' }
})
export class GamepadComponent extends UiElementComponent {

  constructor() {
    super();
    super.minSize = 20;
    super.maxSize = 50;
   }
}
