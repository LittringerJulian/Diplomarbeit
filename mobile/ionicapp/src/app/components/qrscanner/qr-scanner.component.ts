import { Component } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions } from '@ionic-native/camera-preview/ngx';
import jsQr from 'jsQr';
import { HttpService } from 'src/app/services/http.service';
import { WebsocketService } from "../../services/websocket.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-qr-scanner',
    templateUrl: './qr-scanner.component.html',
    styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent {
    qrData: any = "";
    counter = 0;
    cameraSizeX
    cameraSizeY

    constructor(private cameraPreview: CameraPreview, private socket: WebsocketService, private http: HttpService, private router: Router) {
    }

    ngAfterViewInit() {
        this.initCamera();
    }

    requestSocketConnection() {

        this.http.hello(this.qrData).subscribe()

        if (false) {
            this.initSocket();
        }
    }

    initSocket() {
        return this.socket.connect(this.qrData);
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

    async scan() {
        let scanQuality = 75;
        let base64data = "";

        // loop condition
        let scanAgain = true;

        const pictureOpts: CameraPreviewPictureOptions = {
            width: this.cameraSizeX,
            height: this.cameraSizeY,
            quality: scanQuality
        }

        // takes a quick snapshot of the current camera preview
        // ouput: base64 image
        //
        // the same image is loaded into an image object
        // which then is put onto a canvas
        // the canvas finally returns an imageData object,
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
                    if(this.initSocket()){
                        this.cameraPreview.stopCamera()
                        this.router.navigate(["/", "home"])
                    }
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

