import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/iuser';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  users:IUser[] = [];

  successMessage:string;
  errorMessage:string;

  constructor(
    private userService:UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() : void {
    this.userService.getAllUsers().subscribe(
      (resp:any) => {
        this.users = resp.data as IUser[];
      },
      err => console.log(err)
    );
  }

  goToUserDetail(id:number) {
    this.router.navigate([`/admin/user-detail/${id}`]);
  }

  onDeleteUser(id:number) {
    if (!confirm("¿Estaś seguro de eliminar este usuario, se perderan todas sus reservas?"))
      return;

    this.userService.deleteUser(id).subscribe(
      resp => {
        this.getUsers();
        this.showSuccessMessage();
      },
      err => {
        console.log(err);
        this.showErrorMessage(err.error.message);
      }
    );
  }
  
  private showSuccessMessage() : void {
    this.successMessage = "Usuario eliminado exitosamente";
    setTimeout(() => { this.successMessage = undefined }, 7000);
  }

  private showErrorMessage(message:string) : void {
    this.errorMessage = message
    setTimeout(() => { this.errorMessage = undefined }, 7000);
  }
}
