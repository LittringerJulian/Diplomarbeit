import { Component } from '@angular/core';
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
    super.minSize = 20;
    super.maxSize = 20;
  }
}
