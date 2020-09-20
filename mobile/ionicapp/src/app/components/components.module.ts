import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrScannerComponent } from './qrscanner/qr-scanner.component';
import {IonicModule} from "@ionic/angular";


@NgModule({
  declarations: [
    QrScannerComponent
  ],
    imports: [
        CommonModule,
        IonicModule
    ],
  exports: [
    QrScannerComponent
  ]
})
export class ComponentsModule { }
