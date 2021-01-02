import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QrscannerComponent } from './qrscanner/qrscanner.component';
import { QRCodeComponent, QRCodeModule } from 'angularx-qrcode';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './authguard.service';
import { NavigationComponent } from './navigation/navigation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material';
import { GenerateSchemeComponent } from './generate-scheme/generate-scheme.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from "@angular/common";
import { RegisterComponent } from './register/register.component';
import { ButtonComponent } from './button/button.component';
import { JoystickComponent } from './joystick/joystick.component';
import { SchemeNameComponent } from './scheme-name/scheme-name.component';
import { SelectSchemeComponent } from './select-scheme/select-scheme.component';
import { OpenSchemeComponent } from './open-scheme/open-scheme.component';
import { UiElementComponent } from './ui-element/ui-element.component';
import { MySchemesComponent } from './my-schemes/my-schemes.component';
import { JoystickpreviewComponent } from './joystickpreview/joystickpreview.component';
import { TagDialogComponent } from './tag-dialog/tag-dialog.component';
import { TagInputModule } from 'ngx-chips';

import { ColorAlphaModule } from 'ngx-color/alpha'; // <color-alpha-picker></color-alpha-picker>
import { ColorBlockModule } from 'ngx-color/block'; // <color-block></color-block>
import { ColorChromeModule } from 'ngx-color/chrome'; // <color-chrome></color-chrome>
import { ColorCircleModule } from 'ngx-color/circle'; // <color-circle></color-circle>
import { ColorCompactModule } from 'ngx-color/compact'; // <color-compact></color-compact>
import { ColorGithubModule } from 'ngx-color/github'; // <color-github></color-github>
import { ColorHueModule } from 'ngx-color/hue'; // <color-hue-picker></color-hue-picker>
import { ColorMaterialModule } from 'ngx-color/material'; // <color-material></color-material>
import { ColorPhotoshopModule } from 'ngx-color/photoshop'; // <color-photoshop></color-photoshop>
import { ColorSketchModule } from 'ngx-color/sketch'; // <color-sketch></color-sketch>
import { ColorSliderModule } from 'ngx-color/slider'; // <color-slider></color-slider>
import { ColorSwatchesModule } from 'ngx-color/swatches'; // <color-swatches></color-swatches>
import { ColorTwitterModule } from 'ngx-color/twitter'; // <color-twitter></color-twitter>
import { ColorShadeModule } from 'ngx-color/shade'; // <color-shade-picker></color-shade-picker>

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'open', component: OpenSchemeComponent },
  { path: 'scheme', component: GenerateSchemeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'myschemes', component: MySchemesComponent },
  {
    path: 'qrcode', component: QrscannerComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'navigation', component: NavigationComponent },
  {
    path: '**'
    , redirectTo: 'login'
  }
]



@NgModule({
  declarations: [
    AppComponent,
    QrscannerComponent,
    LoginComponent,
    NavigationComponent,
    DialogBodyComponent,
    GenerateSchemeComponent,
    RegisterComponent,
    ButtonComponent,
    JoystickComponent,
    SchemeNameComponent,
    SelectSchemeComponent,
    OpenSchemeComponent,
    UiElementComponent,
    MySchemesComponent,
    JoystickpreviewComponent,
    TagDialogComponent
  ],
  entryComponents: [DialogBodyComponent, SchemeNameComponent, TagDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    QRCodeModule,
    FormsModule,
    MatButtonModule,
    DragDropModule,
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatTableModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    AppRoutingModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    TagInputModule,
    ColorAlphaModule, ColorBlockModule, ColorChromeModule, ColorCircleModule, ColorCompactModule,
    ColorGithubModule, ColorHueModule, ColorMaterialModule, ColorPhotoshopModule, ColorSketchModule,
    ColorSliderModule, ColorSwatchesModule, ColorTwitterModule, ColorShadeModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
