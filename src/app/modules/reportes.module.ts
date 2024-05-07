import { NgModule } from '@angular/core';
import { ReportesComponent } from '../components/reportes/reportes.component';
import { ReportesRoutingModule } from '../routes/reportes-routing.module';
import { CommonModule } from '@angular/common';
import { SplitterModule } from 'primeng/splitter';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';







@NgModule({
  declarations: [
    ReportesComponent,

  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    SplitterModule,
    ButtonModule,
    ToolbarModule,
    SplitButtonModule,
    PanelMenuModule,
    ProgressSpinnerModule
    
  ],

})
export class ReportesModule { }
