import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenSchemePage } from './open-scheme.page';

const routes: Routes = [
  {
    path: '',
    component: OpenSchemePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenSchemePageRoutingModule {}
