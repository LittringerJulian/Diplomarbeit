import { HttpService } from '../http.service';
import { Component } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email:String;
  password:String;
  newUser : User = new User();
  returnuser:User= new User();
  test=null;
  totalAngularPackages:any;


  constructor(private httpService : HttpService,private router: Router ){}


  login(){
   
  this.httpService.login(this.newUser).subscribe(data=>{
    if(data!=null){
    this.test=data;
    console.log(this.test)
    this.router.navigate(['/qrcode']);

   }
  });
}
}

