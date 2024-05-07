import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultComponent } from '../components/consultorio/consult/consult.component';
import { IpsComponent } from '../components/consultorio/ips/ips.component';





const routes: Routes = [
  
  { path: '#consult', component: ConsultComponent},
  { path: 'ips', component: IpsComponent},
  {path: '**',redirectTo:'', pathMatch:'full'},
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultRoutingModule { }
