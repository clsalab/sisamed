import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { LoginService } from './../../../services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginError: string="";
  loginForm=this.formBuilder.group({
    useremail:['', [Validators.required,Validators.email]],
    userpassword: ['', Validators.required],
    
  })
  loading: Boolean = false;
  
  constructor(
    private formBuilder:FormBuilder, 
    private router:Router, 
    private loginService: LoginService,
   
    ) {}

    ngOnInit(): void { 
      this.useremail.setValidators([Validators.required, Validators.email]);
      this.userpassword.setValidators([Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]);
    }
    

  get useremail() {
    return this.loginForm.controls.useremail;
  }

  get userpassword(){
    return this.loginForm.controls.userpassword;
  }
  login(){
    this.loading =true;
    if(this.loginForm.valid){
    
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData)
          if (this.loginService.isLoggedIn()) {
            this.loading =false;
            this.router.navigateByUrl('/inicio');
          }
        },
        error: (errorData) => { this.loading =false;
          console.log(errorData);
          this.loginError="Información de Usuario invalida"
          
        },
        complete: () => { this.loading =false;
          console.info("Login completo");
          this.loginForm.reset();
        }
      });

    }
    else{ this.loading =false;
      this.loginForm.markAllAsTouched();
      alert("Error de usuario o contraseña")
    }
  }
  // Función para manejar el evento de cancelación
  cancel(): void {
    // Navegar de vuelta a la página de inicio o a la ruta que desees
    this.loading =true;
    this.loginForm.reset();
    this.loading =false;
    this.router.navigate(['/inicio']);
  }
}
