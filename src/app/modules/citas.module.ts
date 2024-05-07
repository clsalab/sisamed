import { NgModule } from '@angular/core';
import { CitasComponent } from '../components/citas/citas.component';
import { CitasRoutingModule } from '../routes/citas-routing.module';






@NgModule({
  declarations: [
    CitasComponent,

  ],
  imports: [
    CitasRoutingModule,
  ],

})
export class CitasModule { }
