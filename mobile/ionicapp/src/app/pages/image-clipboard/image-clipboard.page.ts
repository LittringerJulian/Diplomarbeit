import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions } from '@ionic-native/camera-preview/ngx';

@Component({
  selector: 'app-image-clipboard',
  templateUrl: './image-clipboard.page.html',
  styleUrls: ['./image-clipboard.page.scss'],
})
export class ImageClipboardPage {

  cameraSizeX
  cameraSizeY

  constructor(private cameraPreview: CameraPreview, private socket: WebsocketService) {
  }


  ngAfterViewInit() {
    this.initCamera();
  }

  initCamera() {
    this.cameraSizeX = window.screen.width
    this.cameraSizeY = Math.floor(window.screen.height * 0.8)

    const cameraPreviewOpts: CameraPreviewOptions = {
        camera: 'back',
        width: this.cameraSizeX,
        height: this.cameraSizeY,
        x: 0,
        y: 0,
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

    takePhoto(){
      let scanQuality = 75;
      let base64data = "";

      const pictureOpts: CameraPreviewPictureOptions = {
          width: this.cameraSizeX,
          height: this.cameraSizeY,
          quality: scanQuality
      }

      this.cameraPreview.takePicture(pictureOpts).then((pictureData) => {
          base64data = 'data:image/jpeg;base64,' + pictureData;
          this.sendData(base64data)
          /*let imageData;
          let canvas = document.createElement('canvas');
          let context = canvas.getContext('2d');
          let img = new Image();

          img.src = base64data;

          img.onload = () => {

            this.sendData(img)


              canvas.width = img.width;
              canvas.height = img.height;
              context.drawImage(img, 0, 0);

              imageData = context.getImageData(0, 0, img.width, img.height);
          }*/
      }, (err) => {
          console.log(err);
      });
  }

  sendData(img) {
    let data = { type: "copyimage", data: img }
    this.socket.sendData(data)
  }

  ngOnDestroy(){
      this.cameraPreview.stopCamera()
  }


}
