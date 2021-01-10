import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.page.html',
  styleUrls: ['./keyboard.page.scss'],
})
export class KeyboardPage {

  constructor(private socket: WebsocketService) { }

  @ViewChild('inputfield') inputfield
  listenerKeyup
  listenerTouchend

  ngAfterViewInit() {
    window.addEventListener("keyup", this.listenerKeyup = (e) => {

      let keystring

      switch (e.keyCode) {
        case 8:
          keystring = "backspace"
          this.sendInput("keypress", keystring);
          break;
        case 13:
          keystring = "enter"
          this.sendInput("keypress", keystring)
          break;
        case 16:
          keystring = "shift"
          break;
        case 32:
          keystring = "space"
          this.sendInput("keypress", keystring);
          break;
        case 229:
          keystring = this.inputfield.nativeElement.value
          this.sendInput("keytype", keystring);
          break;
        default:
          keystring = e.key
          this.sendInput("keytype", keystring);

      }
      this.inputfield.nativeElement.value = ''
    })


    setTimeout(() => {
      this.inputfield.nativeElement.focus()
      this.inputfield.nativeElement.select()
    }, 100)

    window.addEventListener("touchend", this.listenerTouchend = (e) => {
      e.preventDefault()
      setTimeout(() => {
        this.inputfield.nativeElement.focus()
        this.inputfield.nativeElement.select()
      }, 100)
    })
  }


  sendInput(type, key) {
    let data = { type: type, data: key }
    this.socket.sendData(data)
  }

  ngOnDestroy() {
    window.removeEventListener("keyup", this.listenerKeyup)
    window.removeEventListener("touchend", this.listenerTouchend)
  }


}
