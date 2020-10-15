import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';

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

  jwt(user:User) {
    console.log(user);
   return this.http.post('http://localhost:3000/jwt',user);
 }

 jwt2(id) {
  console.log(id);
 return this.http.get('http://localhost:3000/jwt2/'+id,{responseType: 'text'});
}
}
