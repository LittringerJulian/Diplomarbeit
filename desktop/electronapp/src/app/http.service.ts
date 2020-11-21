import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { User_id } from './user_withoutid';
import { User_new } from './user_new';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  http: HttpClient;


  constructor(http: HttpClient) {
    this.http=http
    }

   //login 
   login(user:User) {
     console.log(user);
    return this.http.post('http://localhost:3000/login',user);
  }

  login2(user:User_new) {
    console.log(user);
   return this.http.post('http://localhost:3000/login',user);
 }

  jwt(user:User) {
    console.log(user);
   return this.http.post('http://localhost:3000/jwt',user);
 }

 jwt2(id) {
  console.log(id);
 return this.http.get('http://localhost:3000/jwt2/'+id,{responseType: 'text'});
}


register(user:User_id){
  return this.http.post('http://localhost:3000/insert',user);
}
}
