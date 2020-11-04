import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'; 


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QrscannerComponent } from './qrscanner/qrscanner.component';
import { QRCodeComponent, QRCodeModule } from 'angularx-qrcode';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './authguard.service';
import { NavigationComponent } from './navigation/navigation.component';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'qrcode', component: QrscannerComponent,
canActivate: [AuthGuardService] },
{ path: 'navigation', component: NavigationComponent },
  { path: '**'
  , redirectTo: 'login' }
  ]


@NgModule({
  declarations: [
    AppComponent,
    QrscannerComponent,
    LoginComponent,
    NavigationComponent,
    DialogBodyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    QRCodeModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule ,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
