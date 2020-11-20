import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../models/iuser';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  errorMessage:string;

  successMessage:string;

  constructor(
    private fb:FormBuilder,
    private auth:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() : void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      c_password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onRegister() {
    if (this.registerForm.invalid)
      return;

    const user:IUser = {
      name : this.registerForm.controls['name'].value,
      lastname : this.registerForm.controls['lastname'].value,
      email : this.registerForm.controls['email'].value,
      password : this.registerForm.controls['password'].value,
      c_password : this.registerForm.controls['c_password'].value,
      role: 'user'
    }

    this.resetMessages();

    this.auth.register(user).subscribe(
      (resp:any) => { 
        this.showSuccessMessage();
        this.router.navigate(['/login']);
      }, 
      err => { 
        console.error(err);
        this.showErrorMessage(err?.error.message);
      }
    );
  }

  private resetMessages() {
    this.errorMessage = undefined;
    this.successMessage = undefined;
  }

  private showSuccessMessage() : void {
    this.successMessage = "Registro exitoso.";
  }

  private showErrorMessage(message:string) : void {
    this.errorMessage = message
  }

}
