import { Component, OnInit } from '@angular/core';


const { CameraPreview } = Plugins;
import { CameraPreviewOptions } from '@capacitor-community/camera-preview';
import { CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { Plugins } from '@capacitor/core';

const { Camera } = Plugins;

import '@capacitor-community/camera-preview';

@Component({
  selector: 'app-connect-to-desktop',
  templateUrl: './connect-to-desktop.page.html',
  styleUrls: ['./connect-to-desktop.page.scss'],
})
export class ConnectToDesktopPage implements OnInit {

  cameraSize = 0;
  cameraMargin = 0;
  pictureData : any = "";

  constructor(private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {

    this.cameraSize = Math.floor(window.screen.width * 0.8);
    this.cameraMargin = Math.floor(window.screen.width * 0.1);

    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'rear',
      toBack: true,
      width: this.cameraSize,
      height: this.cameraSize,
      x: this.cameraMargin,
      y: this.cameraMargin * 5,
    };
    CameraPreview.start(cameraPreviewOptions);

  }

  async capture(){
  const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
    quality: 85
  };
  
  const result = await CameraPreview.capture(cameraPreviewPictureOptions);
  this.pictureData = result.value;

  }
}
