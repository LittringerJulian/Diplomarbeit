import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { User_id } from '../user_withoutid';

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


  constructor(private fb: FormBuilder, private httpService: HttpService, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required]    });
  }

  register() {
    //console.log(this.form.get('first').value);
    this.tempUser.firstname=this.form.get('first').value;
    this.tempUser.lastname=this.form.get('last').value;
    this.tempUser.email=this.form.get('email').value;
    this.tempUser.sex=this.genderControl.value;
    this.tempUser.password=this.form.get('password').value;

    console.log(this.tempUser)

    this.httpService.register(this.tempUser).subscribe(data => {
      if(data=="User inserted"){
        console.log(data);

      }
      else{
        console.log("error")
      }
    });

    
  }

}
