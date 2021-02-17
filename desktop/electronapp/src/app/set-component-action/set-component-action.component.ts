import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';


declare var electron: any;

@Component({
  selector: 'app-set-component-action',
  templateUrl: './set-component-action.component.html',
  styleUrls: ['./set-component-action.component.scss'],
  host: { '(keydown)': 'recordKeypress($event)', '(keyup)': 'stopShortcut()' }
})
export class SetComponentActionComponent implements OnInit {


  recording: Boolean = false
  shortcutString: string = ""

  // 0: singleKey
  // 1: shortcutString
  // 2-5: keys
  shortcut = []
  type
  current = 0

  constructor(public dialogRef: MatDialogRef<SetComponentActionComponent>) { }

  ngOnInit() {

  }

  startShortcut() {
    if (this.type == 'button') {
      this.shortcut = this.shortcut.slice(0, 1)
      this.shortcut.push("")
    }
    this.recording = true
  }

  recordKeypress($event) {
    $event.preventDefault()
    if (this.recording) {
      $event = $event.key.toUpperCase()

      if (this.type == 'button') { // BUTTON
        if (!this.shortcut.includes($event)) {
          if ($event == ' ') {
            this.shortcut.push("SPACEBAR")
          }
          else {
            this.shortcut.push($event)
          }
          if (this.shortcut.length == 6 || this.shortcut[0]) {
            this.stopShortcut()
          }
        }
      } else { // JOYSTICK/GAMEPAD
        this.shortcut[this.current] = $event
      }
    }
  }

  stopShortcut() {
    if (this.recording) {
      this.shortcut[1] = ""
      for (let i = 2; i < this.shortcut.length; i++) {

        switch (this.shortcut[i]) {
          case "SPACEBAR":
            this.shortcut[1] += "SPACE"
            break;
          case "CONTROL":
            this.shortcut[1] += "CTRL"
            break;
          case "BACKSPACE":
            this.shortcut[1] += "BACK"
            break;
          case "DELETE":
            this.shortcut[1] += "DEL"
            break;
          default:
            this.shortcut[1] += this.shortcut[i]
        }
        if (i < this.shortcut.length - 1) {
          if (this.type == 'button') {
            this.shortcut[1] += " + "
          } else {
            this.shortcut[1] += " | "
          }
        }
      }
      //electron.ipcRenderer.send("pressShortcut", this.shortcut)
    }
    this.recording = false
  }

  changeMode(bool) {
    this.shortcut = [bool, ""]
  }
}
