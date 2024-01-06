import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegistrarPacienteComponent } from './pages/registrar-paciente/registrar-paciente.component';
import { InicioPacienteComponent } from './pages/inicio-paciente/inicio-paciente.component';
import { UsersComponent } from './pages/users/users.component';
import { ShowUsersComponent } from './components/show-users/show-users.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';




const routes: Routes = [
   {path: 'inicio', component: DashboardComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  { path: 'inicio-paciente', component: InicioPacienteComponent },
  { path: 'registrar-paciente', component: RegistrarPacienteComponent},
  { path: 'usuario', component: UsersComponent},
  { path: 'show-user', component: ShowUsersComponent},
  { path: 'create-user', component: CreateUserComponent},
  { path: 'edit-user/:id', component: EditUserComponent},
  { path: 'update-user/:id', component: CreateUserComponent},
  {path: '',redirectTo:'/inicio', pathMatch:'full'},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
