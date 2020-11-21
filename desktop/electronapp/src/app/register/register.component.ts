import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { User_id } from '../user_withoutid';
import { User_new } from '../user_new';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  private formSubmitAttempt: boolean;
  genderControl = new FormControl('M');
  tempUser: User_id = new User_id();
  test = null;
  authUser: User_new = new User_new();
  token;

  public loginInvalid: boolean;


  constructor(private fb: FormBuilder, private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  register() {
    this.tempUser.firstname = this.form.get('first').value;
    this.tempUser.lastname = this.form.get('last').value;
    this.tempUser.email = this.form.get('email').value;
    this.tempUser.sex = this.genderControl.value;
    this.tempUser.password = this.form.get('password').value;


    this.httpService.register(this.tempUser).subscribe(data => {

      this.test = data;

      if (this.test.inserted == "success") {
        this.authUser._id = this.test._id;


        this.httpService.jwt2(this.authUser._id).subscribe(data => {



          this.token = data


          if (data != null) {
            localStorage.setItem('token', this.token)
            console.log("token set")
            console.log("Token:" + localStorage.getItem('token'));

            this.router.navigate(['/qrcode']);
          }

        })
      }
      //this.router.navigate(['/qrcode']);

      if (this.test.inserted == "emailexists") {
        this.loginInvalid = true;

        console.log("email exists")
      }


    });


  }

  async registerBefore() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      await this.register()
    } else {
      this.formSubmitAttempt = true;
    }
  }

}
