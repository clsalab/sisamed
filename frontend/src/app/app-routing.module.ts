import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileUpdateComponent } from './components/users/profile-update/profile-update.component';




const routes: Routes = [
  {path: 'inicio', component: DashboardComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  { path: 'profile-update', component: ProfileUpdateComponent, canActivate: [AuthGuard]},
  { path: 'citas', loadChildren: () => import('./modules/citas.module').then(m => m.CitasModule) },
  { path: 'medicos', loadChildren: () => import('./modules/medicos.module').then(m => m.MedicosModule) },
  { path: 'pacientes', loadChildren: () => import('./modules/pacientes.module').then(m => m.PacientesModule) },
  { path: 'reportes', loadChildren: () => import('./modules/reportes.module').then(m => m.ReportesModule) },
  { path: 'servicios', loadChildren: () => import('./modules/servicios.module').then(m => m.ServiceModule) },
  { path: 'panel-admin', loadChildren: () => import('./modules/panelAdmin.module').then(m => m.PanelAdminModule) },  
  {path: '**',redirectTo:'/inicio', pathMatch:'full'},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
