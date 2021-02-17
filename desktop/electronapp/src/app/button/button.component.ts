import { Component } from '@angular/core';
import { UiElementComponent } from '../ui-element/ui-element.component';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: { '(click)': 'selected()' }
})
export class ButtonComponent extends UiElementComponent {
  
  constructor() {
    super();
    super.minSize = 5;
    super.maxSize = 50;
  }
}
