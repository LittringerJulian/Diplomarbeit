import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-connect-to-desktop',
  templateUrl: './connect-to-desktop.page.html',
  styleUrls: ['./connect-to-desktop.page.scss'],
})
export class ConnectToDesktopPage implements OnInit, OnDestroy {

  platformIsAndroid = false;

  constructor() { }

  ngOnInit() {
    this.platformIsAndroid = true
  }
  
  @HostListener('unloaded')
  ngOnDestroy(){
    console.log("sdf");
    
  }

}
