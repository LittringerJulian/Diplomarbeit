import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import jsQr from 'jsQr';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.scss'],
})
export class QrscannerComponent {

  cameraSize = 0;
  cameraMargin = 0;
  qrData: any = "";
  counter = 0;

  constructor(private cameraPreview: CameraPreview) { }

  ngAfterViewInit() {
    this.setupCamera();
  }

  setupCamera() {
    this.cameraSize = Math.floor(window.screen.width * 0.8);
    this.cameraMargin = Math.floor(window.screen.width * 0.1);

    const cameraPreviewOpts: CameraPreviewOptions = {
      camera: 'back',
      width: this.cameraSize,
      height: this.cameraSize,
      x: this.cameraMargin,
      y: this.cameraMargin * 5,
      toBack: true,
      tapPhoto: false,
    };

    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });
  }

  async scan() {
    let scanSize = 2048;
    let scanQuality = 100;
    let base64data = "";

    const pictureOpts: CameraPreviewPictureOptions = {
      width: scanSize,
      height: scanSize,
      quality: scanQuality
    }

    this.cameraPreview.takeSnapshot(pictureOpts).then((snapshotData) => {
      base64data = 'data:image/jpeg;base64,' + snapshotData;

      let imageData;
      let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d');
      let img = new Image();

      img.src = base64data;
      img.onload = () => {

        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);

        imageData = context.getImageData(0, 0, img.width, img.height);

        this.qrData = jsQr(imageData.data, imageData.width, imageData.height, {inversionAttempts: "dontInvert"}).data;
        this.counter++;
      }

    }, (err) => {
      console.log(err);
      this.qrData = 'Snapshot failed.';
    });

  }

}
