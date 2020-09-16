import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'connect-to-desktop',
    loadChildren: () => import('./connect-to-desktop/connect-to-desktop.module').then( m => m.ConnectToDesktopPageModule)
  },
  {
    path: '',
    redirectTo: 'connect-to-desktop',
    pathMatch: 'full'
  },
  {
    path: 'connect-to-desktop',
    loadChildren: () => import('./connect-to-desktop/connect-to-desktop.module').then( m => m.ConnectToDesktopPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
