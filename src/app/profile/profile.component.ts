import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../models/iuser';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userDataForm:FormGroup;

  errorMessage:string;

  successMessage:string;

  constructor(
    private fb:FormBuilder,
    private user:UserService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() : void {
    this.userDataForm = this.fb.group({
      name: [this.user.user?.name, [Validators.required]],
      lastname: [this.user.user?.lastname, [Validators.required]],
      email: [{value: this.user.user?.email, disabled: true}],
    });
  }

  onUpdate() {
    if (this.userDataForm.invalid)
      return;

    const user:IUser = {
      id: this.user.user.id,
      name: this.userDataForm.controls['name'].value,
      lastname: this.userDataForm.controls['lastname'].value,
    }

    this.user.update(user).subscribe(
      resp => {
        this.showSuccessMessage();
      },
      err => {
        console.log(err);
        this.showErrorMessage(err.error.message);
      }
    )
  }

  private showSuccessMessage() : void {
    this.successMessage = "Usuario actualizado exitosamente";
    setTimeout(() => { this.successMessage = undefined }, 7000);
  }

  private showErrorMessage(message:string) : void {
    this.errorMessage = message
    setTimeout(() => { this.errorMessage = undefined }, 7000);
  }

}
