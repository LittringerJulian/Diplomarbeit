import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrScannerComponent } from './qrscanner/qr-scanner.component';
import { QrScannerAndroidComponent } from './qr-scanner-android/qr-scanner-android.component';
import {IonicModule} from "@ionic/angular";
import { ButtonElementComponent } from './button-element/button-element.component';


@NgModule({
  declarations: [
    QrScannerComponent,
    QrScannerAndroidComponent,
    ButtonElementComponent,
  ],
    imports: [
        CommonModule,
        IonicModule
    ],
  exports: [
    QrScannerComponent,
    QrScannerAndroidComponent,
    ButtonElementComponent
  ]
})
export class ComponentsModule { }
