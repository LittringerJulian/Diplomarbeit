import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrscannerComponent } from './qrscanner/qrscanner.component';


@NgModule({
  declarations: [
    QrscannerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    QrscannerComponent
  ]
})
export class ComponentsModule { }
