import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QrscannerComponent } from './qrscanner/qrscanner.component';
import { QRCodeModule } from 'angularx-qrcode';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    AppComponent,
    QrscannerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    QRCodeModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
