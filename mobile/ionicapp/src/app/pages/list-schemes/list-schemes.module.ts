import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListSchemesPageRoutingModule } from './list-schemes-routing.module';

import { ListSchemesPage } from './list-schemes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListSchemesPageRoutingModule
  ],
  declarations: [ListSchemesPage]
})
export class ListSchemesPageModule {}
