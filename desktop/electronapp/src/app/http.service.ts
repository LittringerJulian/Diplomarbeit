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
    return this.http.post<any>('http://localhost:3000/login',user);
  }
}
