import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ConnectToDesktopPageRoutingModule } from './connect-to-desktop-routing.module';
import { ConnectToDesktopPage } from './connect-to-desktop.page';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnectToDesktopPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ConnectToDesktopPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConnectToDesktopPageModule {}
