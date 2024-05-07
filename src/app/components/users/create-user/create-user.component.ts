import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/auth/register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/userModel';







@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
  
 
})

export class CreateUserComponent implements OnInit {
  registrationMessage: string = '';
  userForm: FormGroup;
  titulo = 'Crear nuevo usuario';
  user: User[] = [];
  loading: boolean = false;

  

  constructor(private registerService: RegisterService, 
    private fb:FormBuilder,
     private router: Router,
      private toastr: ToastrService,
       ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      useremail: ['', Validators.email],
      userpassword: ['', Validators.required],
      userroles: ['', Validators.required],

    })
  
  }

  ngOnInit(): void {
 
  }

  register2(): void {
    this.loading = true;
    if (this.userForm.valid) {
      this.registerService.register(this.userForm.value).subscribe(
        (response) => {
          this.userForm.reset();
          this.registrationMessage = '¡Usuario registrado con éxito!';
          this.toastr.success('El usuario fue registrado con exito!', 'Usuario registrado!');
          this.router.navigateByUrl('/panel-admin/items-users');
          this.loading = false;
          
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
      this.userForm.markAllAsTouched();
    }
  }

} 
