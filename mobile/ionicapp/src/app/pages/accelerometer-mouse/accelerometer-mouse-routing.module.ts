import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccelerometerMousePage } from './accelerometer-mouse.page';

const routes: Routes = [
  {
    path: '',
    component: AccelerometerMousePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccelerometerMousePageRoutingModule {}
