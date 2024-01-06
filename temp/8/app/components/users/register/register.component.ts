import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/auth/register.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationMessage: string = '';
  userDetails: User = new User('', '', '', '', '');
  

  registerForm!: FormGroup;

  

  constructor(private registerService: RegisterService, private router: Router, private formBuilder: FormBuilder, private toastr: ToastrService) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      useremail: ['', [Validators.required, Validators.email]],
      userpassword: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      this.registerService.register(this.registerForm.value).subscribe(
        (response) => {
          this.registerForm.reset();
          this.registrationMessage = '¡Usuario registrado con éxito!';
          this.toastr.success(this.registrationMessage, 'Registro Exitoso');
          this.router.navigateByUrl('/inicio');
        },
        (error) => {
          console.error('Error en el registro:', error);

          // Mostrar mensajes de error específicos según el tipo de error
          if (error === 'DUPLICATE_USER') {
            this.registrationMessage = 'El usuario ya existe. Por favor, elija otro nombre de usuario o correo electrónico.';
          } else if (error === 'ERROR_REGISTER_USER') {
            this.registrationMessage = 'Hubo un error al registrar el usuario. Por favor, inténtelo de nuevo más tarde.';
          } else {
            this.registrationMessage = 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo.';
          }

          this.toastr.error(this.registrationMessage, 'Error al registrar usuario');
        }
      );
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  cancel(): void {
    console.log('Registro cancelado');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get useremail() {
    return this.registerForm.get('useremail');
  }

  get userpassword() {
    return this.registerForm.get('userpassword');
  }
} 