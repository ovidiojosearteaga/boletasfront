import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  errorMessage:string;

  successMessage:string;

  constructor(
    private fb:FormBuilder,
    private auth:AuthService,
    private router:Router,
    private user:UserService,
  ) { }

  ngOnInit(): void {
    this.iniLoginForm();
  }

  private iniLoginForm() :void {
    this.loginForm = this.fb.group({
      email: ['admin@email.com', [Validators.required, Validators.email]],
      password: ['123456789', [Validators.required]]
    });
  }

  onLogin() {
    if (this.loginForm.invalid)
      return;

    const email:string = this.loginForm.controls['email'].value;
    const password:string = this.loginForm.controls['password'].value;

    this.resetMessages();

    this.auth.login(email, password).subscribe(
      resp => { this.loginSuccessFullyActions(resp) },
      err => { this.loginErrorActions(err) },
    )
  }

  private loginSuccessFullyActions(resp:any) : void {
    this.showSuccessMessage();
    this.auth.token = resp.data.token;
    this.user.user = resp.data.user;
    this.router.navigate(['/profile']);
  }
  
  private loginErrorActions(err) : void{
    console.log(err);
    this.showErrorMessage(err.error.message);
  }

  private resetMessages() {
    this.errorMessage = undefined;
    this.successMessage = undefined;
  }

  private showSuccessMessage() : void {
    this.successMessage = "Login exitoso.";
  }

  private showErrorMessage(message:string) : void {
    this.errorMessage = message
  }

}
