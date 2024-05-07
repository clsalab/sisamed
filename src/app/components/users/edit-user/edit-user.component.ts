import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit{
  editUserForm: FormGroup;
  titulo = 'Actualizar datos del Usuario';
  id: string | null;
  loading: boolean = true;
  registrationMessage: string = '';

  constructor( 
     private fb:FormBuilder,
     private router: Router,
      private toastr: ToastrService,
       private userService: UsersService,
       private aRouter: ActivatedRoute
       
       ) {
     this.editUserForm = this.fb.group({
      username: ['', Validators.required],
      useremail: ['', [Validators.required, Validators.email]],
      userroles: ['', Validators.required],

    }) 
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.updateUser();
      
  }

  actualizarUser() {
    this.loading = true;
    if (this.id !== null) {
      const userEmail = this.editUserForm.get('useremail')?.value;
      if (!this.validateEmail(userEmail)) {
        this.loading = false;
        this.registrationMessage = 'El correo electrónico no tiene un formato válido.';
        this.toastr.error('El correo electrónico no tiene un formato válido.', 'Error de formato');
        return;
      }
      const usuarioActualizado: User = {
        username: this.editUserForm.get('username')?.value,
        useremail: userEmail,
        userroles: this.editUserForm.get('userroles')?.value,
        userestado: 'activo',
        userpassword: ''
      };

      this.userService.updateUserData(this.id, usuarioActualizado).subscribe(
        data => {
          this.toastr.info('Los cambios fueron guardados con éxito', 'Usuario actualizado');
          this.router.navigate(['/panel-admin']);
        },
        error => {
          this.loading = false;
          console.error('Error al actualizar el usuario:', error);
          console.log('Objeto de error:', error);

          if (error === 'DUPLICATE_USER') {
            this.loading = false;
            this.registrationMessage = 'El usuario con ese correo electrónico ya existe. Por favor, elija otro correo electrónico.';
            this.toastr.error('El usuario con ese correo electrónico ya existe.', 'Error de duplicidad');
          } else {
            this.loading = false;
            this.registrationMessage = 'Hubo un error al actualizar los datos del usuario. Por favor, verifique que los datos estén correctos e inténtelo nuevamente.';
            this.toastr.error('Ocurrió un error al actualizar el usuario. Por favor, inténtelo de nuevo.', 'Error al actualizar usuario');
          }
        }
      );
    }
  }

  updateUser() {
    this.loading = true;
    if (this.id !== null) {
      this.titulo = 'Actualizar datos del usuario';
      this.userService.obtenerUser(this.id).subscribe(
        (response: any) => {
          console.log('Datos del usuario obtenidos:', response.data);

          const data = response.data || {};
          const nombreUsuario = data.username || 'Nombre de Usuario Desconocido';
          const emailUsuario = data.useremail || 'Email Desconocido';
          const rolesUsuario = data.userroles || 'Roles Desconocidos';

          this.titulo = `Actualizar datos de ${nombreUsuario}`;

          this.editUserForm.patchValue({
            username: nombreUsuario,
            useremail: emailUsuario,
            userroles: rolesUsuario,
          });
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.error('Error al obtener datos del usuario:', error);
        }
      );
    } else {
      this.loading = false;
      this.titulo = 'Crear nuevo usuario';
    }
  }

  // Función para validar el formato del correo electrónico con expresión regular
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
