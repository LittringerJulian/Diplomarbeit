import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import jsQr from 'jsQr';

@Component({
  selector: 'app-connect-to-desktop',
  templateUrl: './connect-to-desktop.page.html',
  styleUrls: ['./connect-to-desktop.page.scss'],
})
export class ConnectToDesktopPage {

  cameraSize = 0;
  cameraMargin = 0;
  pictureData: any = "";
  counter: any = "";
  @ViewChild('canvas') canvas: ElementRef;
  //canvasElement: any;
  //canvasContext: any;

  lol: any;

  constructor(private cameraPreview: CameraPreview) { }

  ngAfterViewInit() {
    this.setupCamera();

    //this.canvasElement = this.canvas.nativeElement;
    //this.canvasContext = this.canvasElement.getContext('2d');
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

    // start camera
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });

  }

  async takeSnapshot() {
    let size = 1280;
    let data = "";

    const pictureOpts: CameraPreviewPictureOptions = {
      width: size,
      height: size,
      quality: 85
    }

    // take a snap shot
    this.cameraPreview.takeSnapshot(pictureOpts).then((imageData) => {
      data = 'data:image/jpeg;base64,' + imageData;
      //this.counter = data;

      //canvas
      /*this.canvasElement.width = size;
      this.canvasElement.height = size;
  
      let img = new Image();
      img.src = data;
      img.onload = this.canvasContext.drawImage(img, 0, 0);  
      
      let newdata = this.canvasContext.getImageData(0, 0, size, size);
      this.counter = newdata;*/
      var canvas = document.createElement('canvas');
      let img = new Image();
      img.src = data;
      var myData;

      img.onload = function(){

        var context = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;
        
        context.drawImage(img, 0, 0);
        myData = context.getImageData(0, 0, img.width, img.height);
      }
      this.counter = "lol" + myData;

      //this.counter = newdata.data;

      //this.counter = jsQr(newdata.data, newdata.width, newdata.height);


    }, (err) => {
      console.log(err);
      data = 'AAAAAAAAAAAAAAAAAHHHHHH ES GEHT NEEEEEEED';
    });

  }

}
