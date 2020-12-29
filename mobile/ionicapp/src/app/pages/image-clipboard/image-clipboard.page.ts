import { Component, OnInit } from '@angular/core';
import { Plugins } from "@capacitor/core"
const { CameraPreview } = Plugins;
import { CameraPreviewOptions, CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';
import { WebsocketService } from 'src/app/services/websocket.service';

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
    
    this.imgQuality = 100;
    this.cameraSizeX = window.screen.width
    this.cameraSizeY = window.screen.height

    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'rear',
      x: 0,
      y: 0,
      toBack: true,
    };

    CameraPreview.start(cameraPreviewOptions);
  }

  async takePhoto() {
    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
      width: 1080,
      height: 1920,
      quality: this.imgQuality
    }
    const result = await CameraPreview.capture(cameraPreviewPictureOptions).then((base64data) => {
      console.log(window.screen.width, window.screen.height);
      
      this.sendData(base64data)
    });
  }

  sendData(img) {
    let data = { type: "copyimage", data: img }
    this.socket.sendData(data)
  }

  ngOnDestroy() {
    CameraPreview.stop();
  }

  flipCamera() {
    CameraPreview.flip();
  }
}
