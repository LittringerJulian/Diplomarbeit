import { Component, ElementRef, ViewChild } from '@angular/core';
import jsQr from 'jsQr';
import { WebsocketService } from "../../services/websocket.service";

@Component({
  selector: 'app-qr-scanner-android',
  templateUrl: './qr-scanner-android.component.html',
  styleUrls: ['./qr-scanner-android.component.scss'],
})
export class QrScannerAndroidComponent {

  qrData: any
  @ViewChild('video') video: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  videoElement : any
  canvasElement: any
  canvasContext: any

  videoReady = false;

  constructor(private socket: WebsocketService) { }

  async startScan(){
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: window.innerHeight, height: window.innerWidth, facingMode: "environment" }
    })

    this.videoElement.srcObject = stream
    this.videoElement.setAttribute('playsinline', true)
    this.videoElement.play()
    requestAnimationFrame(this.scan.bind(this))
  }

  initSocket() {
    return this.socket.connect(this.qrData);
  }

  scan(){
    if(this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA){
      this.videoReady = true
      
      this.canvasElement.height = this.videoElement.height
      this.canvasElement.width = this.videoElement.width

      this.canvasContext.drawImage(this.videoElement, 0, 0, this.canvasElement.width, this.canvasElement.height)
      let imageData = this.canvasContext.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height)
      
      this.qrData = jsQr(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });

      console.log(this.qrData);


      if(this.qrData){
        console.log("found some data %s", this.qrData);
        this.qrData = this.qrData.data
        
        if(!this.initSocket()){
          this.qrData = null
        }
      }
      else{
        requestAnimationFrame(this.scan.bind(this))
      }
    }else{
      requestAnimationFrame(this.scan.bind(this))
    }
  }

  ngAfterViewInit(){
    this.videoElement = this.video.nativeElement
    this.canvasElement = this.canvas.nativeElement
    this.canvasContext = this.canvasElement.getContext('2d')
    this.startScan()
  }

}
