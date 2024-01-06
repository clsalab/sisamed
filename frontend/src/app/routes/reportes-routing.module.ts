import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportesComponent } from '../components/reportes/reportes.component';
import { ShowUsersComponent } from '../components/users/show-users/show-users.component';
import { CreatePacienteComponent } from '../components/pacientes/create-paciente/create-paciente.component';
import { AuthGuard } from '../auth/auth.guard';




const routes: Routes = [

  {
    path: '',
    component: ReportesComponent,
  },
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
