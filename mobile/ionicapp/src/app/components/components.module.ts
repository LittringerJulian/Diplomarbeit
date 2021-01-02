import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrScannerComponent } from './qrscanner/qr-scanner.component';
import { QrScannerAndroidComponent } from './qr-scanner-android/qr-scanner-android.component';
import {IonicModule} from "@ionic/angular";


@NgModule({
  declarations: [
    QrScannerComponent,
    QrScannerAndroidComponent,
  ],
    imports: [
        CommonModule,
        IonicModule
    ],
  exports: [
    QrScannerComponent,
    QrScannerAndroidComponent,
  ]
})
export class ComponentsModule { }
