import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaserpointerPageRoutingModule } from './laserpointer-routing.module';

import { LaserpointerPage } from './laserpointer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaserpointerPageRoutingModule
  ],
  declarations: [LaserpointerPage]
})
export class LaserpointerPageModule {}
