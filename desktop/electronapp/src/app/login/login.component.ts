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
  email: String;
  password: String;
  newUser: User = new User();
  test = null;
  totalAngularPackages: any;
  loginText: String = "";
  authUser: User = new User()
  token;


  constructor(private httpService: HttpService, private router: Router) { }


  login() {

    this.httpService.login(this.newUser).subscribe(data => {
      if (data != null) {
        this.test = data;

        if (this.test != null && this.test.found == "success") {

          console.log(this.test.found)
          this.authUser.id = this.test.id;


          this.httpService.jwt2(this.test.id).subscribe(data => {

            if (data != null) {
              console.log(this.token)
              localStorage.setItem('token', this.token)
            }

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
          this.newUser.email = "";
          this.newUser.password = "";
          this.loginText = "wrong credentials!"
          console.log(this.newUser.email)
        }
      }
    });
  }


    ngOnInit(): void {
      console.log(localStorage.getItem('token'));
      if(localStorage.getItem('token') != "null") {
      this.router.navigate(['/qrcode']);
      console.log("not null")
    }
    if (localStorage.getItem('token') == "null") {
      console.log("null")
    }

  }

}


