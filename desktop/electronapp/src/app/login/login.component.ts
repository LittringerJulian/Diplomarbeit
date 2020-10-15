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
  authUser:User=new User()
  token=null;


  constructor(private httpService : HttpService,private router: Router ){}


  login(){
   
  this.httpService.login(this.newUser).subscribe(data=>{
    if(data!=null){
      this.test=data;

      if(this.test!=null && this.test.found=="success"){

    console.log(this.test.found)
    this.authUser.id=this.test.id;


    this.httpService.jwt2(this.test.id).subscribe(data=>{
      
      this.token=data
      console.log(data)

      if(data!=null){
        localStorage.setItem('token', this.token)
      }

    })

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

 }

}

