import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccelerometerMousePageRoutingModule } from './accelerometer-mouse-routing.module';

import { AccelerometerMousePage } from './accelerometer-mouse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccelerometerMousePageRoutingModule
  ],
  declarations: [AccelerometerMousePage]
})
export class AccelerometerMousePageModule {}
