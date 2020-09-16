import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectToDesktopPage } from './connect-to-desktop.page';

const routes: Routes = [
  {
    path: '',
    component: ConnectToDesktopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectToDesktopPageRoutingModule {}
