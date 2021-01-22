import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediaControlsPage } from './media-controls.page';

const routes: Routes = [
  {
    path: '',
    component: MediaControlsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaControlsPageRoutingModule {}
