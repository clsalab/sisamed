import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
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
  constructor(private formBuilder:FormBuilder, private router:Router, private loginService: LoginService) {}

  ngOnInit(): void { 
  }

  get useremail() {
    return this.loginForm.controls.useremail;
  }

  get userpassword(){
    return this.loginForm.controls.userpassword;
  }
  login(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData)
          if (this.loginService.isLoggedIn()) {
            this.router.navigateByUrl('/inicio');
          }
        },
        error: (errorData) => {
          console.log(errorData);
          this.loginError=errorData.message; //se agrego .message
        },
        complete: () => {
          console.info("Login completo");
          this.loginForm.reset();
        }
      });

    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error de usuario o contraseña")
    }
  }
}
