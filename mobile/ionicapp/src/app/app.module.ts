import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { WebsocketService } from './services/websocket.service';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';

import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';

import { Device } from '@ionic-native/device/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
declare var Hammer: any

export class GestureConfig extends HammerGestureConfig {
    // overrides = <any>{ 'pan': { direction: Hammer.DIRECTION_ALL } };

    buildHammer(element: HTMLElement) {
        const mc = new Hammer.Manager(element)

        mc.add(new Hammer.Pan({
            event: 'myPan',
            direction: Hammer.DIRECTION_ALL,
            threshold: 5,
            taps: 1,
        }));
        return mc;
    }
}


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        BrowserAnimationsModule,
        HammerModule,
        MatRippleModule, 
        MatIconModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        CameraPreview,
        Gyroscope,
        DeviceMotion,
        WebsocketService,
        HttpService,
        Device,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
