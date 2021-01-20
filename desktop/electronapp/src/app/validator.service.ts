import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  static confirmPassword(control: FormControl, group: FormGroup, matchPassword: string) {
        
    return new Promise(resolve => {
        
        if (!control.value && group.controls[matchPassword].value !== null || group.controls[matchPassword].value === control.value) {
            group.controls['password2'].setErrors(null)
            resolve(null)
        } else {
            group.controls['password2'].setErrors({ 'mustMatch': true })
            if (matchPassword == 'password') {
                resolve({ 'mustMatch': true })
            } else {
                resolve(null)
            }
        }
    })
}
}
