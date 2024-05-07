import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConocenosComponent } from '../components/servicios/conocenos/conocenos.component';
import { PortafolioComponent } from '../components/servicios/portafolio/portafolio.component';
import { ContactosComponent } from '../components/servicios/conocenos/contactos/contactos.component';









const routes: Routes = [
  
  { path: 'nosotros', component: ConocenosComponent},
  { path: 'portafolio', component: PortafolioComponent},
  { path: 'nosotros/contacto', component: ContactosComponent},
  {path: '**',redirectTo:'', pathMatch:'full'},
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
