import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from '../components/pacientes/sidebar/sidebar.component';







const routes: Routes = [
  
  { path: '', component: SidebarComponent },
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientessRoutingModule { }
