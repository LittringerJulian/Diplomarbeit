import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'connectToDesktop',
    loadChildren: () => import('./pages/connect-to-desktop/connect-to-desktop.module').then( m => m.ConnectToDesktopPageModule)
  },
  {
    path: '',
    redirectTo: 'connectToDesktop',
    pathMatch: 'full'
  },
  {
    path: 'laserpointer',
    loadChildren: () => import('./pages/laserpointer/laserpointer.module').then( m => m.LaserpointerPageModule)
  },
  {
    path: 'accelerometer-mouse',
    loadChildren: () => import('./pages/accelerometer-mouse/accelerometer-mouse.module').then( m => m.AccelerometerMousePageModule)
  },  {
    path: 'image-clipboard',
    loadChildren: () => import('./pages/image-clipboard/image-clipboard.module').then( m => m.ImageClipboardPageModule)
  },
  {
    path: 'keyboard',
    loadChildren: () => import('./pages/keyboard/keyboard.module').then( m => m.KeyboardPageModule)
  },
  {
    path: 'trackpad',
    loadChildren: () => import('./pages/trackpad/trackpad.module').then( m => m.TrackpadPageModule)
  },
  {
    path: 'list-schemes',
    loadChildren: () => import('./pages/list-schemes/list-schemes.module').then( m => m.ListSchemesPageModule)
  },
  {
    path: 'open-scheme',
    loadChildren: () => import('./pages/open-scheme/open-scheme.module').then( m => m.OpenSchemePageModule)
  },
  {
    path: 'media-controls',
    loadChildren: () => import('./pages/media-controls/media-controls.module').then( m => m.MediaControlsPageModule)
  },
  {
    path: 'presentation',
    loadChildren: () => import('./pages/presentation/presentation.module').then( m => m.PresentationPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
