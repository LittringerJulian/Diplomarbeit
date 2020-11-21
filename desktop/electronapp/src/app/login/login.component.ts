import { HttpService } from '../http.service';
import { Component } from '@angular/core';
import { User } from '../user';
import { User_new } from '../user_new';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  email: String;
  private formSubmitAttempt: boolean;
  public loginInvalid: boolean;


  password: String;
  newUser: User = new User();
  tempUser: User_new = new User_new();

  test = null;
  totalAngularPackages: any;
  loginText: String = "";
  authUser: User = new User()
  token;


  constructor(private fb: FormBuilder,private httpService: HttpService, private router: Router) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });

    if(localStorage.getItem('token') != "null") {
    this.router.navigate(['/qrcode']);
    console.log("not null")
  }
  if (localStorage.getItem('token') == "null") {
    console.log("null")
  }

}

login2(){
this.newUser.email=this.form.get('email').value;
this.newUser.password=this.form.get('password').value;


  this.httpService.login(this.newUser).subscribe(data => {
    if (data != null) {
      this.test = data;

      if (this.test != null && this.test.found == "success") {

        console.log(this.test.found)
        this.tempUser._id= this.test._id;
        //this.authUser.id = this.test.id;
        console.log(this.tempUser)


        this.httpService.jwt2(this.tempUser._id).subscribe(data => {

         

          this.token = data
          console.log(data)


          if (data != null) {
            localStorage.setItem('token', this.token)
            console.log("token set")
            console.log("Token:" + localStorage.getItem('token'));

            this.router.navigate(['/qrcode']);
          }

        })

        // this.router.navigate(['/qrcode']);
      }
      else {
        //this.newUser.email = "";
        //this.newUser.password = "";
        this.loginInvalid = true;
      }
    }
  });
}

  async login() {

    
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {  
        await this.login2()
    } else {
      this.formSubmitAttempt = true;
    }
  

    
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }
  delete(){
    localStorage.setItem('token', null)

  }

}


