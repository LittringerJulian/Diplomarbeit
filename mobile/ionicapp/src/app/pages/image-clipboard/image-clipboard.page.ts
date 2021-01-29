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
  colorPickerEnabled = false

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
      let toastString
        if(this.colorPickerEnabled){
          toastString = 'Copied color to clipboard.'
        }
        else{
          toastString = 'Copied image to clipboard.'
        }
        this.presentToast(toastString)
    }, (err) => { 
      this.presentToast('Something went wrong. Please try again.')
    });
  }

  sendData(img) {
    let type = this.colorPickerEnabled ? "copycolor" : "copyimage"
    let data = { type: type, data: img }
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
      CameraPreview.setFlashMode({flashMode: 'on'})
    }
    else {
      CameraPreview.setFlashMode({flashMode: 'off'})
    }
  }

  enableColorPicker(bool){
    this.colorPickerEnabled = bool
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      position: 'top',
      message: text,
      duration: 2000
    });
    toast.present();
  }


  openGallery() {
    this.colorPickerEnabled = false
    let options: ImagePickerOptions = { maximumImagesCount: 1, outputType: 1}

    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.sendData(results[i]);
        this.presentToast('Copied image to clipboard.')
      }
    }, (err) => { 
      this.presentToast('Something went wrong. Please try again.')
    });
  }

}
