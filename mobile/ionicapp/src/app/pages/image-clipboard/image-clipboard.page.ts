import { Component, OnInit } from '@angular/core';
import { Plugins } from "@capacitor/core"
const { CameraPreview } = Plugins;
import { CameraPreviewOptions } from '@capacitor-community/camera-preview';
import { WebsocketService } from 'src/app/services/websocket.service';
import { CameraPreviewPictureOptions } from '@ionic-native/camera-preview/ngx';

@Component({
  selector: 'app-image-clipboard',
  templateUrl: './image-clipboard.page.html',
  styleUrls: ['./image-clipboard.page.scss'],
})
export class ImageClipboardPage {

  cameraSizeX
  cameraSizeY
  imgQuality

  constructor(private socket: WebsocketService) {
  }


  ngAfterViewInit() {
    this.initCamera();
  }

  initCamera() {
    this.cameraSizeX = window.screen.width
    this.cameraSizeY = Math.floor(window.screen.height * 0.8)

    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'rear',
      width: this.cameraSizeX,
      height: this.cameraSizeY,
      x: 0,
      y: 0,
    };
    CameraPreview.start(cameraPreviewOptions);
  }

    async takePhoto(){
      this.imgQuality = 100;

      const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
          width: this.cameraSizeX,
          height: this.cameraSizeY,
          quality: this.imgQuality
      }

      const result = await CameraPreview.capture(cameraPreviewPictureOptions).then((base64data) => {
        this.sendData(base64data)});
  }

  sendData(img) {
    let data = { type: "copyimage", data: img }
    this.socket.sendData(data)
  }

  ngOnDestroy(){
    CameraPreview.stop();
  }
}
