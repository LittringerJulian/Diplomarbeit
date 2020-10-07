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
  test=null;
  totalAngularPackages:any;
  loginText:String="";


  constructor(private httpService : HttpService,private router: Router ){}


  login(){
   
  this.httpService.login(this.newUser).subscribe(data=>{
    if(data!=null){
      this.test=data;

      if(this.test!=null && this.test.found=="success"){

    console.log(this.test)
    console.log(this.test.found)
    localStorage.setItem('token', "tokenreturn")

    this.router.navigate(['/qrcode']);
  }
  else{
    this.newUser.email = "";
    this.newUser.password="";
    this.loginText="wrong credentials!"
    console.log(this.newUser.email)
  }
   }
  });
}

  ngOnInit(): void {
  console.log(localStorage.getItem('token'));

  localStorage.setItem('token', 'null')
 }

}

