import { Component, ElementRef, HostListener, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jsQr from 'jsQr';
import { WebsocketService } from "../../services/websocket.service";

@Component({
  selector: 'app-qr-scanner-android',
  templateUrl: './qr-scanner-android.component.html',
  styleUrls: ['./qr-scanner-android.component.scss'],
})
export class QrScannerAndroidComponent implements OnDestroy {

  qrData: any
  @ViewChild('video') video: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  videoElement: any
  canvasElement: any
  canvasContext: any

  videoReady = false;
  canTryConnection = true

  constructor(private socket: WebsocketService, private router: Router, private zone: NgZone) { }

  ngAfterViewInit() {
    this.videoElement = this.video.nativeElement
    this.canvasElement = this.canvas.nativeElement
    this.canvasContext = this.canvasElement.getContext('2d')
    this.startScan()


    this.socket.canConnect.subscribe(res => {
      if (res) {
        this.router.navigate(["/", "home"])
      }
      else {
        this.canTryConnection = true
        this.qrData = null
        this.scan()
      }
    })
  }

  async startScan() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: window.innerHeight, height: window.innerWidth, facingMode: "environment" }
    })
    
    this.videoElement.srcObject = stream
    this.videoElement.setAttribute('playsinline', true)
    this.videoElement.play()
    requestAnimationFrame(this.scan.bind(this))
  }

  scan() {
    //console.log(this.videoReady);
    
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA && this.canTryConnection) {
        this.videoReady = true


      this.canvasElement.height = this.videoElement.height
      this.canvasElement.width = this.videoElement.width

      this.canvasContext.drawImage(this.videoElement, 0, 0, this.canvasElement.width, this.canvasElement.height)
      let imageData = this.canvasContext.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height)

      this.qrData = jsQr(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });

      if (this.qrData) {
        this.canTryConnection = false
        this.qrData = this.qrData.data
        this.initSocket()
      }
      else {
        requestAnimationFrame(this.scan.bind(this))
      }
    } else {
      requestAnimationFrame(this.scan.bind(this))
    }
  }

  initSocket() {
    this.socket.connect(this.qrData);
  }

  @HostListener('unloaded')
  ngOnDestroy() {
    console.log("DESTROY");
  }

}
