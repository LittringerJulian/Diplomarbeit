import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { User_id } from './user_withoutid';
import { User_new } from './user_new';
import { Scheme } from './scheme';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  http: HttpClient;


  constructor(http: HttpClient) {
    this.http = http
  }

  //login 
  login(user: User) {
    console.log(user);
    return this.http.post('http://localhost:3000/login', user);
  }

  login2(user: User_new) {
    console.log(user);
    return this.http.post('http://localhost:3000/login', user);
  }

  jwt(user: User) {
    console.log(user);
    return this.http.post('http://localhost:3000/jwt', user);
  }

  jwt2(id) {
    console.log(id);
    return this.http.get('http://localhost:3000/jwt2/' + id, { responseType: 'text' });
  }


  register(user: User_id) {
    return this.http.post('http://localhost:3000/insert', user);
  }

  saveScheme(scheme: Scheme) {
    let token = localStorage.getItem('token');
    //let headers = new HttpHeaders().set('responseType', 'text');//.set('Authorization',`Bearer ${token}`);

    const options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      responseType: 'text' as 'text'
    };
    //console.log(headers);
    return this.http.post('http://localhost:3000/insertScheme', scheme, options);

  }

  getSchemeByUserId() {
    let token = localStorage.getItem('token');
    //let headers = new HttpHeaders().set('responseType', 'text');//.set('Authorization',`Bearer ${token}`);

    const options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      responseType: 'text' as 'text'
    };
    //console.log(headers);
    return this.http.get('http://localhost:3000/getSchemeByUserId', options);

  }

  getScheme(json) {
    console.log(json);
    return this.http.post('http://localhost:3000/getScheme', json, { responseType: 'text' });
  }

  insertPublicScheme(json) {
    let token = localStorage.getItem('token');

    console.log()
    const options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      responseType: 'text' as 'text'
    };

    return this.http.post('http://localhost:3000/insertPublicScheme/', json, options);
  }

  updateScheme(json) {

    let token = localStorage.getItem('token');
    console.log(json)

    const options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      responseType: 'text' as 'text'
    };

    return this.http.post('http://localhost:3000/updateScheme', json, options);

  }

  getPublicSchemes() {
    let token = localStorage.getItem('token');
 

    const options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      responseType: 'text' as 'text'
    };

    return this.http.get('http://localhost:3000/findAllPublic', options);

  }

  getUserInformation() {
    let token = localStorage.getItem('token');
 

    const options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      responseType: 'text' as 'text'
    };

    return this.http.get('http://localhost:3000/getUserInfo', options);
  }

  getFilteredSchemes(json) {
    let token = localStorage.getItem('token');
 

    const options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      responseType: 'text' as 'text'
    };

    return this.http.post('http://localhost:3000/getPublicSchemeBy',json, options);
  }
}
