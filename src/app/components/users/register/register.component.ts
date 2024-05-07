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
  loading: Boolean = false;

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
    this.loading = true;
    if (this.registerForm.valid) {
      this.registerService.register(this.registerForm.value).subscribe(
        (response) => {
          this.registerForm.reset();
          this.registrationMessage = '¡Usuario registrado con éxito!';
          this.toastr.success(this.registrationMessage, 'Registro Exitoso');
          this.loading = false;
          this.router.navigateByUrl('/inicio');
        },
        (error) => { this.loading = false;
          console.error('Error en el registro:', error);

          // Mostrar mensajes de error específicos según el tipo de error
          if (error === 'DUPLICATE_USER') { this.loading = false;
            this.registrationMessage = 'El usuario con ese correo electrónico ya existe. Por favor, elija otro correo electrónico.';
          } else if (error === 'ERROR_REGISTER_USER') { this.loading = false;
            this.registrationMessage = 'Hubo un error al registrar el usuario. Por favor, verifique que los datos estén correctos e inténtelo nuevamente.';
          } else { this.loading = false;
            this.registrationMessage = 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo.';
          }
          this.loading = false;
          this.toastr.error(this.registrationMessage, 'Error al registrar usuario');
        }
      );
    } else { this.loading = false;
      this.registerForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.loading = true;
    this.registerForm.reset();
    this.loading = false
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