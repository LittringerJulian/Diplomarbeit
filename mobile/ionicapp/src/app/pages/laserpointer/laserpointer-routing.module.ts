import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaserpointerPage } from './laserpointer.page';

const routes: Routes = [
  {
    path: '',
    component: LaserpointerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaserpointerPageRoutingModule {}
