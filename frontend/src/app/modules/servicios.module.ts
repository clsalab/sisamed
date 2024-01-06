import { NgModule } from '@angular/core';
import { ConocenosComponent } from '../components/servicios/conocenos/conocenos.component';
import { PortafolioComponent } from '../components/servicios/portafolio/portafolio.component';
import { ServiceRoutingModule } from '../routes/servicios-routing.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactosComponent } from '../components/servicios/conocenos/contactos/contactos.component';





@NgModule({
  declarations: [
    ConocenosComponent,
    PortafolioComponent,
    ContactosComponent
    
   

  ],
  imports: [
    ServiceRoutingModule, 
    CardModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule
  
  ],

})
export class ServiceModule { }
