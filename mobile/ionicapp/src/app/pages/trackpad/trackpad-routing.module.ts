import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackpadPage } from './trackpad.page';

const routes: Routes = [
  {
    path: '',
    component: TrackpadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackpadPageRoutingModule {}
