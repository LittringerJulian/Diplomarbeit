import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackpadPageRoutingModule } from './trackpad-routing.module';

import { TrackpadPage } from './trackpad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackpadPageRoutingModule
  ],
  declarations: [TrackpadPage]
})
export class TrackpadPageModule {}
