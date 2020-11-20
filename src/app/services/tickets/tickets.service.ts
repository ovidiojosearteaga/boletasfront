import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private user: UserService,
  ) { 
  }

  getTickets(userId:number = undefined) {
    if(userId === undefined)
      userId = this.user.user.id;

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.auth.token}`);

    const url:string = `${environment.url}/tickets/fromuser/${userId}`;
    return this.http.get(url, {headers: headers});
  }

  delete(id:number) {
    const headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${this.auth.token}`);

    const url:string = `${environment.url}/tickets/${id}`;
    return this.http.delete(url, {headers: headers});
  }

  reserve() {
    const headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${this.auth.token}`);

    const url:string = `${environment.url}/tickets/`;
    return this.http.post(
      url, 
      { user_id: this.user.user.id }, 
      { headers: headers }
    );
  }

  addMaxTicketsConfig(max:number) {
    const headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${this.auth.token}`);

    const url:string = `${environment.url}/configuration/`;

    return this.http.post(
      url,
      { max_tickets: max },
      { headers: headers }
    );
  }

  updateMaxTicketsConfig(max:number, id:number) {
    const headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${this.auth.token}`);

    const url:string = `${environment.url}/configuration/${id}`;

    return this.http.put(
      url,
      { max_tickets: max },
      { headers: headers }
    );
  }

  getMaxTickets() {
    const headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${this.auth.token}`);

    const url:string = `${environment.url}/configuration/`;

    return this.http.get(
      url,
      { headers: headers }
    );
  }

  getTicketsAvailable() {
    const headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${this.auth.token}`);

    const url:string = `${environment.url}/tickets/available`;

    return this.http.get(
      url,
      { headers: headers }
    )
  }
}
