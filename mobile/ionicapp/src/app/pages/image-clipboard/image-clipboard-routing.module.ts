import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageClipboardPage } from './image-clipboard.page';

const routes: Routes = [
  {
    path: '',
    component: ImageClipboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageClipboardPageRoutingModule {}
