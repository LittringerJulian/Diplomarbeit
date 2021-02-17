import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QRCodeComponent, QRCodeModule } from 'angularx-qrcode';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
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
import { UiElementComponent } from './ui-element/ui-element.component';
import { MySchemesComponent } from './my-schemes/my-schemes.component';
import { JoystickpreviewComponent } from './joystickpreview/joystickpreview.component';
import { TagDialogComponent } from './tag-dialog/tag-dialog.component';
import { TagInputModule } from 'ngx-chips';
import { MatSnackBarModule } from "@angular/material";
import { PublicSchemesComponent } from './public-schemes/public-schemes.component';
import { ButtonpreviewComponent } from './buttonpreview/buttonpreview.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ColorChromeModule } from 'ngx-color/chrome';
import { SetComponentActionComponent } from './set-component-action/set-component-action.component';
import { MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { InterceptorService } from './loader/interceptor.service';
import { ColorCircleModule } from 'ngx-color/circle';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { AccountComponent } from './account/account.component';
import { GamepadComponent } from './gamepad/gamepad.component';
import { TrackpadComponent } from './trackpad/trackpad.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainScreenComponent },
  { path: 'scheme', component: GenerateSchemeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'myschemes', component: MySchemesComponent },
  { path: 'publicschemes', component: PublicSchemesComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'account', component: AccountComponent },
  {
    path: '**'
    , redirectTo: 'login'
  }
  
]



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    DialogBodyComponent,
    GenerateSchemeComponent,
    RegisterComponent,
    ButtonComponent,
    JoystickComponent,
    SchemeNameComponent,
    UiElementComponent,
    MySchemesComponent,
    JoystickpreviewComponent,
    TagDialogComponent,
    PublicSchemesComponent,
    ButtonpreviewComponent,
    SetComponentActionComponent,
    MainScreenComponent,
    AccountComponent,
    GamepadComponent,
    TrackpadComponent
  ],
  entryComponents: [DialogBodyComponent, SchemeNameComponent, TagDialogComponent, SetComponentActionComponent],
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
    MatAutocompleteModule,
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
    MatSnackBarModule,
    MatProgressSpinnerModule,
    TagInputModule,
    ColorChromeModule,
    MatRadioModule,
    ColorCircleModule,
    MatRippleModule,
    MatChipsModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatBadgeModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
  ],
  exports: [
    MatInputModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
