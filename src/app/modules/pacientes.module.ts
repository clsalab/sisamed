import { NgModule } from '@angular/core';
import { PacientessRoutingModule } from '../routes/pacientes-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../components/pacientes/sidebar/sidebar.component';
import { PacientesService } from '../services/pacientes.service';
import { PanelMenuModule } from 'primeng/panelmenu';





@NgModule({
  declarations: [
    SidebarComponent

  ],
  providers: [PacientesService],
  imports: [
    CommonModule,
    PacientessRoutingModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    PanelMenuModule
  ],

})
export class PacientesModule { }
