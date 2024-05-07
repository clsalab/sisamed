import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowUsersComponent } from '../components/users/show-users/show-users.component';
import { CreatePacienteComponent } from '../components/pacientes/create-paciente/create-paciente.component';
import { AuthGuard } from '../auth/auth.guard';
import { PanelAdminComponent } from '../components/panel-admin/panel-admin.component';
import { ShowPacientesComponent } from '../components/pacientes/show-pacientes/show-pacientes.component';
import { CreateUserComponent } from '../components/users/create-user/create-user.component';
import { EditUserComponent } from '../components/users/edit-user/edit-user.component';
import { EditPacienteComponent } from '../components/pacientes/edit-paciente/edit-paciente.component';
import { CreateMedicoComponent } from '../components/medicos/create-medico/create-medico.component';
import { ShowMedicoComponent } from '../components/medicos/show-medico/show-medico.component';
import { EditMedicoComponent } from '../components/medicos/edit-medico/edit-medico.component';
import { CreateConsultComponent } from '../components/consultorio/create-consult/create-consult.component';
import { EditConsultComponent } from '../components/consultorio/edit-consult/edit-consult.component';
import { ShowConsultComponent } from '../components/consultorio/show-consult/show-consult.component';
import { EditCitaComponent } from '../components/citas/edit-cita/edit-cita.component';
import { ShowCitasComponent } from '../components/citas/show-citas/show-citas.component';
import { CreateCitaComponent } from '../components/citas/create-cita/create-cita.component';
import { CitasService } from '../services/citas.service';




const routes: Routes = [

  {
    path: '',
    component: PanelAdminComponent,
    children: [
      
      { path: 'items-users', component: ShowUsersComponent },
      { path: 'register-user', component: CreateUserComponent },
      { path: 'items-pacientes', component: ShowPacientesComponent },
      { path: 'register-paciente', component: CreatePacienteComponent },
      { path: 'edit-user/:id', component: EditUserComponent },
      { path: 'edit-paciente/:id', component: EditPacienteComponent },
      { path: 'register-medico', component: CreateMedicoComponent },
      { path: 'items-medicos', component: ShowMedicoComponent },
      { path: 'edit-medico/:id', component: EditMedicoComponent },
      { path: 'register-consult', component: CreateConsultComponent },
      { path: 'edit-consult/:id', component: EditConsultComponent },
      { path: 'items-consults', component: ShowConsultComponent },
      { path: 'register-cita', component: CreateCitaComponent },
      { path: 'edit-cita', component: EditCitaComponent },
      { path: 'items-citas', component: ShowCitasComponent },
      { path: '', redirectTo: 'items-pacientes', pathMatch: 'full' },
    ],canActivate: [AuthGuard] 
  },
  

];

@NgModule({
  providers: [CitasService],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelAdminRoutingModule { }
