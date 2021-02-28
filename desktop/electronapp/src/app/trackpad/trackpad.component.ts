import { Component } from '@angular/core';
import { UiElementComponent } from '../ui-element/ui-element.component';

@Component({
  selector: 'app-trackpad',
  templateUrl: './trackpad.component.html',
  styleUrls: ['./trackpad.component.scss'],
  host: { '(click)': 'selected()' }
})
export class TrackpadComponent extends UiElementComponent {

  constructor() { 
    super();
    super.minSize = 20;
    super.maxSize = 1000;
  }
}
