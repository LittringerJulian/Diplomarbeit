import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'; 


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QrscannerComponent } from './qrscanner/qrscanner.component';
import { QRCodeModule } from 'angularx-qrcode';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'qrcode', component: QrscannerComponent },

 /* { path: 'main', component: AppComponent,
canActivate: [AuthGuardService] },*/
  { path: '**'
  , redirectTo: 'login' }
  ]


@NgModule({
  declarations: [
    AppComponent,
    QrscannerComponent,
    LoginComponent
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
