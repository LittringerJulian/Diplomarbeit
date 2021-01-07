import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'app-connect-to-desktop',
  templateUrl: './connect-to-desktop.page.html',
  styleUrls: ['./connect-to-desktop.page.scss'],
})
export class ConnectToDesktopPage implements OnInit, OnDestroy {

  platformIsAndroid

  constructor(private device: Device) { }

  ngOnInit() {
    this.platformIsAndroid = (this.device.platform.toLowerCase() == "android")
  }
  
  @HostListener('unloaded')
  ngOnDestroy(){
    console.log("DESTROY");
  }

}
