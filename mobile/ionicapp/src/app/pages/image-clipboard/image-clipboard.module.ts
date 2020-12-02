import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageClipboardPageRoutingModule } from './image-clipboard-routing.module';

import { ImageClipboardPage } from './image-clipboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageClipboardPageRoutingModule
  ],
  declarations: [ImageClipboardPage]
})
export class ImageClipboardPageModule {}
