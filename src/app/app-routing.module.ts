import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { ConfigurationComponent } from './admin/configuration/configuration.component';
import { UserDetailComponent } from './admin/user-detail/user-detail.component';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleAdminGuard } from './guards/role-admin.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'my-tickets', component: MyTicketsComponent, canActivate: [AuthGuard] },
  { 
    path: 'admin', 
    canActivate: [AuthGuard, RoleAdminGuard], 
    children: [
      {path: 'users', component: UsuariosComponent},
      {path: 'user-detail/:id', component: UserDetailComponent},
      {path: 'configuration', component: ConfigurationComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
