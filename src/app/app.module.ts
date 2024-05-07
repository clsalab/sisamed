import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavComponent } from './shared/nav/nav.component';
import { RegisterService } from './services/auth/register.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProfileUpdateComponent } from './components/users/profile-update/profile-update.component';
import { ButtonModule } from 'primeng/button';
import { UsersDashboardComponent } from './components/users/users-dashboard/users-dashboard.component';
import { ReportesComponent } from './components/reportes/reportes.component';









const routes: Routes = [
  // ... otras rutas
  { path: 'dashboard', component: DashboardComponent },
  { path: 'reportes', component: ReportesComponent},
  // ... otras rutas
];

@NgModule({
  declarations: [
    AppComponent,
    EmpleadosComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    NavComponent,
    ProfileUpdateComponent,
    UsersDashboardComponent,
  
    
  
  

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ProgressSpinnerModule,
    ButtonModule,
    
  ],
  exports: [ProgressSpinnerModule, ButtonModule],
  providers: [
    RegisterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
