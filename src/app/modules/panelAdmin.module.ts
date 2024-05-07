import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitterModule } from 'primeng/splitter';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ShowUsersComponent } from '../components/users/show-users/show-users.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PanelAdminRoutingModule } from '../routes/panelAdmin-routing.module';
import { PanelAdminComponent } from '../components/panel-admin/panel-admin.component';
import { FilterPipe } from '../components/users/show-users/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowPacientesComponent } from '../components/pacientes/show-pacientes/show-pacientes.component';
import { CreatePacienteComponent } from '../components/pacientes/create-paciente/create-paciente.component';
import { EditUserComponent } from '../components/users/edit-user/edit-user.component';
import { CreateUserComponent } from '../components/users/create-user/create-user.component';
import { EditPacienteComponent } from '../components/pacientes/edit-paciente/edit-paciente.component';
import { ShowMedicoComponent } from '../components/medicos/show-medico/show-medico.component';
import { CreateMedicoComponent } from '../components/medicos/create-medico/create-medico.component';
import { EditMedicoComponent } from '../components/medicos/edit-medico/edit-medico.component';
import { CreateConsultComponent } from '../components/consultorio/create-consult/create-consult.component';
import { EditConsultComponent } from '../components/consultorio/edit-consult/edit-consult.component';
import { ShowConsultComponent } from '../components/consultorio/show-consult/show-consult.component';
import { EditCitaComponent } from '../components/citas/edit-cita/edit-cita.component';
import { ShowCitasComponent } from '../components/citas/show-citas/show-citas.component';
import { CreateCitaComponent } from '../components/citas/create-cita/create-cita.component';







@NgModule({
  declarations: [
    PanelAdminComponent,
    ShowUsersComponent,
    FilterPipe,
    ShowPacientesComponent,
    CreatePacienteComponent,
    EditUserComponent,
    CreateUserComponent,
    EditPacienteComponent,
    ShowMedicoComponent,
    CreateMedicoComponent,
    EditMedicoComponent,
    CreateConsultComponent,
    EditConsultComponent,
    ShowConsultComponent,
    CreateCitaComponent,
    EditCitaComponent,
    ShowCitasComponent

  ],
  imports: [
    CommonModule,
    PanelAdminRoutingModule,
    SplitterModule,
    ButtonModule,
    ToolbarModule,
    SplitButtonModule,
    PanelMenuModule,
    ProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule
    
  ],

})
export class PanelAdminModule { }
