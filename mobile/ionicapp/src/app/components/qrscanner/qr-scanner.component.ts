import { Component } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions } from '@ionic-native/camera-preview/ngx';
import jsQr from 'jsQr';
import { WebsocketService } from "../../services/websocket.service";

@Component({
    selector: 'app-qr-scanner',
    templateUrl: './qr-scanner.component.html',
    styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent {
    qrData: any = "";
    counter = 0;

    constructor(private cameraPreview: CameraPreview, private socket: WebsocketService) {
    }

    ngAfterViewInit() {
        this.initCamera();
    }

    initSocket() {
        this.socket.connect(this.qrData);
    }

    initCamera() {
        let cameraSize = Math.floor(window.screen.width * 0.8);
        let cameraMargin = Math.floor(window.screen.width * 0.1);

        const cameraPreviewOpts: CameraPreviewOptions = {
            camera: 'back',
            width: cameraSize,
            height: cameraSize,
            x: cameraMargin,
            y: cameraMargin * 5,
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
        let scanSize = 1024;
        let scanQuality = 100;
        let base64data = "";

        // loop condition
        let scanAgain = true;

        const pictureOpts: CameraPreviewPictureOptions = {
            width: scanSize,
            height: scanSize,
            quality: scanQuality
        }

            // takes a quick snapshot of the current camera preview
            // ouput: base64 image
            //
            // the same image is loaded into an image object
            // which then is put on a canvas
            // the canvas finally return an imageData object
            // which is the correct format to use in the jsQr library
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

                    this.qrData = jsQr(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });

                    // checks scan frequency
                    this.counter++;

                    // connecting to socket
                    // scan is repeated until success or termination by user
                    if (this.qrData != "" && this.qrData != null) {
                        this.qrData = this.qrData.data
                        console.log(this.qrData + " init socket")
                        this.initSocket();
                       
                    }
                    else {
                        // repeat scan
                    }
                }

            }, (err) => {
                console.log(err);
                console.log("Scan failed.");
            });

        }
    }

