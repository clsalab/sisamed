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

  constructor( 
    private fb:FormBuilder,
     private router: Router,
      private toastr: ToastrService,
       private userService: UsersService,
       private aRouter: ActivatedRoute
       ) {
    this.editUserForm = this.fb.group({
      username: ['', Validators.required],
      useremail: ['', Validators.email],
      userroles: ['', Validators.required],

    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.updateUser();
      
  }

  agregarUser() {
    if (this.id !== null) {
      const usuarioActualizado: User = {
        username: this.editUserForm.get('username')?.value,
        useremail: this.editUserForm.get('useremail')?.value,
        userroles: this.editUserForm.get('userroles')?.value,
        userestado: 'activo',
        userpassword: ''
      };

      console.log('Usuario actualizado:', usuarioActualizado);

      this.userService.updateUserData(this.id, usuarioActualizado).subscribe(
        data => {
          this.toastr.info('Los cambios fueron guardados con éxito', 'Usuario actualizado');
          this.router.navigate(['/show-user']);
        },
        error => {
          console.error('Error al actualizar el usuario:', error);
          // Maneja el error, por ejemplo, muestra un mensaje al usuario
        }
      );
    }
  }




  updateUser() {
    if (this.id !== null) {
        this.titulo = 'Actualizar datos del usuario';
        this.userService.obtenerUser(this.id).subscribe(
            (response: any) => {
                console.log('Datos del usuario obtenidos:', response.data);

                // Accede directamente a los datos dentro de la propiedad 'data'
                const data = response.data || {};
                const nombreUsuario = data.username || 'Nombre de Usuario Desconocido';
                const emailUsuario = data.useremail || 'Email Desconocido';
                const rolesUsuario = data.userroles || 'Roles Desconocidos';

                this.titulo = `Actualizar datos de ${nombreUsuario}`;
                
                // Actualiza el formulario con los datos obtenidos
                this.editUserForm.patchValue({
                    username: nombreUsuario,
                    useremail: emailUsuario,
                    userroles: rolesUsuario,
                });

            },
            error => {
                console.error('Error al obtener datos del usuario:', error);
                // Maneja el error, por ejemplo, muestra un mensaje al usuario
            }
        );
    } else {
        this.titulo = 'Crear nuevo usuario';
    }
}




}
