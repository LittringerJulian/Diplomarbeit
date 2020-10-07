import { HttpService } from './http.service';
import { Component } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  email:String;
  password:String;
  newUser : User = new User();
  returnuser:User= new User();
  test;
  totalAngularPackages:any;


  constructor(private httpService : HttpService){}


  login(){
   
  this.httpService.login(this.newUser).subscribe(data=>{this.test=data});
   console.log(this.test);
  }
}

