import { HttpService } from './http.service';
import { Component } from '@angular/core';
import { User } from './user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'connect-app';
  email:String;
  password:String;
  newUser : User = new User();
  test:any;


  constructor(private httpService : HttpService){}


  login(){
    console.log(this.newUser);
   this.httpService.login(this.newUser).subscribe(data=>this.test);
   console.log(this.test);
  }
}
