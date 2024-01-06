import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasComponent } from '../components/citas/citas.component';








const routes: Routes = [
  
  { path: '', component: CitasComponent},
  {path: '**',redirectTo:'', pathMatch:'full'},
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitasRoutingModule { }
