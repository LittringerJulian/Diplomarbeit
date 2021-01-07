import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenSchemePageRoutingModule } from './open-scheme-routing.module';

import { OpenSchemePage } from './open-scheme.page';


import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenSchemePageRoutingModule,
    ComponentsModule
  ],
  declarations: [OpenSchemePage]
})
export class OpenSchemePageModule {}
