import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicosComponent } from '../components/medicos/medicos.component';







const routes: Routes = [
  
  { path: '', component: MedicosComponent},
  {path: '**',redirectTo:'', pathMatch:'full'},
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicosRoutingModule { }
