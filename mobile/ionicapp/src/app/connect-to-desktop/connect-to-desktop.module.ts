import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnectToDesktopPageRoutingModule } from './connect-to-desktop-routing.module';

import { ConnectToDesktopPage } from './connect-to-desktop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnectToDesktopPageRoutingModule
  ],
  declarations: [ConnectToDesktopPage]
})
export class ConnectToDesktopPageModule {}
