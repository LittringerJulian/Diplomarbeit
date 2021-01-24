import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MediaControlsPageRoutingModule } from './media-controls-routing.module';

import { MediaControlsPage } from './media-controls.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediaControlsPageRoutingModule
  ],
  declarations: [MediaControlsPage]
})
export class MediaControlsPageModule {}
