import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/iuser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token:string;

  constructor(
    private http:HttpClient
  ) { }

  register(user:IUser) {
    const registerUrl:string = `${environment.url}/register`;
    
    return this.http.post(registerUrl, user);
  }

  login(email:string, password:string) {
    const loginUrl:string = `${environment.url}/login`;

    return this.http.post(loginUrl, {email, password});
  }

  logout() {
    const url:string = `${environment.url}/logout`;
    const headers:HttpHeaders = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);

    return this.http.get(url, { headers: headers });
  }
}
