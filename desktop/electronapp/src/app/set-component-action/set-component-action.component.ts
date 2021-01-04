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

  constructor(public dialogRef: MatDialogRef<SetComponentActionComponent>) { }

  ngOnInit() {
  }

  startShortcut() {
    this.shortcut = this.shortcut.slice(0, 1)
    this.shortcut.push("")
    this.recording = true

    console.log(this.shortcut);

  }

  recordKeypress($event) {
    $event.preventDefault()
    if (this.recording) {
      $event = $event.key.toUpperCase()
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
    }
  }

  stopShortcut() {
    if (this.recording) {
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
          this.shortcut[1] += " + "
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
