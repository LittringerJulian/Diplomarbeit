import { Component, OnInit } from '@angular/core';
import { Plugins } from "@capacitor/core"
const { CameraPreview } = Plugins;
import { CameraPreviewOptions, CameraPreviewPictureOptions, CameraPreviewFlashMode } from '@capacitor-community/camera-preview';
import { WebsocketService } from 'src/app/services/websocket.service';
import { ToastController } from '@ionic/angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';


@Component({
  selector: 'app-image-clipboard',
  templateUrl: './image-clipboard.page.html',
  styleUrls: ['./image-clipboard.page.scss'],
})
export class ImageClipboardPage {

  cameraSizeX
  cameraSizeY
  imgQuality
  flashEnabled

  constructor(private socket: WebsocketService, public toastController: ToastController, private imagePicker: ImagePicker) {
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
      rotateWhenOrientationChanged: false,

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
      this.presentToast()
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

  setFlashMode(bool) {
    this.flashEnabled = bool
    if (this.flashEnabled) {
      const CameraPreviewFlashMode: CameraPreviewFlashMode = 'on';
      CameraPreview.setFlashMode(CameraPreviewFlashMode)
    }
    else {
      const CameraPreviewFlashMode: CameraPreviewFlashMode = 'off';
      CameraPreview.setFlashMode(CameraPreviewFlashMode)
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      position: 'top',
      message: 'Photo captured.',
      duration: 2000
    });
    toast.present();
  }


  openGallery() {
    let options: ImagePickerOptions = { maximumImagesCount: 1, outputType: 1}

    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.sendData(results[i]);
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });
  }

}
