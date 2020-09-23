import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'connect-app';
  email:String;
  password:String;

  login(){
    console.log("deos nothing")
  }
}
