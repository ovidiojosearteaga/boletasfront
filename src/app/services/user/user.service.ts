import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/iuser';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user:IUser;

  headers:HttpHeaders;

  constructor(
    private http:HttpClient,
    private auth:AuthService
  ) {  
  }

  get user() {
    return this._user;
  }

  set user(user:IUser) {
    this._user = user;
  }

  update(user:IUser) {

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.auth.token}`);

    const url = `${environment.url}/users/${user.id}`;

    return this.http.put(
      url,
      user,
      { headers: headers});
  }

  getAllUsers() {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.auth.token}`);

    const url = `${environment.url}/users`;

    return this.http.get(url, { headers: headers });
  }

  getUserDetail(id:number) {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.auth.token}`);

    const url = `${environment.url}/users/${id}`;

    return this.http.get(url, { headers: headers });
  }

  deleteUser(id:number) {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.auth.token}`);

    const url = `${environment.url}/users/${id}`;

    return this.http.delete(url, { headers: headers});
  }
}
