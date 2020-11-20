import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public user:UserService,
    public auth:AuthService,
    private router:Router
  ) {

  }

  onLogout() {
    this.auth.logout().subscribe();
    this.auth.token = undefined;
    this.user.user = undefined;
    this.router.navigate(['/']);
  }
}
