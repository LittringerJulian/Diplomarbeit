import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListSchemesPage } from './list-schemes.page';

const routes: Routes = [
  {
    path: '',
    component: ListSchemesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListSchemesPageRoutingModule {}
