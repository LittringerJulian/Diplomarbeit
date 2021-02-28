import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrScannerComponent } from './qrscanner/qr-scanner.component';
import { QrScannerAndroidComponent } from './qr-scanner-android/qr-scanner-android.component';
import {IonicModule} from "@ionic/angular";
import { ButtonElementComponent } from './button-element/button-element.component';
import { TrackpadElementComponent } from './trackpad-element/trackpad-element.component';
import { JoystickElementComponent } from './joystick-element/joystick-element.component';
import { GamepadElementComponent } from './gamepad-element/gamepad-element.component';




@NgModule({
  declarations: [
    QrScannerComponent,
    QrScannerAndroidComponent,
    ButtonElementComponent,
    TrackpadElementComponent,
    JoystickElementComponent,
    GamepadElementComponent
  ],
    imports: [
        CommonModule,
        IonicModule
    ],
  exports: [
    QrScannerComponent,
    QrScannerAndroidComponent,
    ButtonElementComponent,
    TrackpadElementComponent,
    JoystickElementComponent,
    GamepadElementComponent
  ]
})
export class ComponentsModule { }
