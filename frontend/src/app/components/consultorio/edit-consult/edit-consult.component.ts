import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Consult } from 'src/app/models/consultorio';
import { ConsultsService } from 'src/app/services/consults.service';
@Component({
  selector: 'app-edit-consult',
  templateUrl: './edit-consult.component.html',
  styleUrl: './edit-consult.component.css'
})
export class EditConsultComponent {
  editConsultForm: FormGroup;
  titulo = 'Actualizar datos del Consultorio';
  id: string | null;
  loading: boolean = true;
  registrationMessage: string = '';

  constructor( 
    private fb:FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private consultsService: ConsultsService,
    private aRouter: ActivatedRoute

      ) {
    this. editConsultForm = this.fb.group({
      conNombre: ['', Validators.required],
      conUbicacion: ['', Validators.required],
      conEspecialidad: ['', Validators.required],
      conEstado: [null, Validators.required],
      
    }) 
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.id = this.aRouter.snapshot.paramMap.get('id');
    console.log('ID del Consultorio:', this.id);
    this.updateConsult();
      
  }

  actualizarConsult() {
    this.loading = true;
    if (this.id !== null) {
      /* const userEmail = this. editConsultForm.get('conNombre')?.value; */
      /* if (!this.validateEmail(userEmail)) {
        this.loading = false;
        this.registrationMessage = 'El correo electrónico no tiene un formato válido.';
        this.toastr.error('El correo electrónico no tiene un formato válido.', 'Error de formato');
        return;
      } */
      const consultActualizado: Consult = {
        conNombre: this. editConsultForm.get('conNombre')?.value,
        conUbicacion: this. editConsultForm.get('conUbicacion')?.value,
        conEspecialidad: this. editConsultForm.get('conEspecialidad')?.value,
        conEstado: this. editConsultForm.get('conEstado')?.value,
        
      };

      this.consultsService.updateConsultData(this.id, consultActualizado).subscribe(
        data => {
          this.toastr.info('Los cambios fueron guardados con éxito', 'Consultorio actualizado');
          this.router.navigate(['/panel-admin/items-consults']);
        },
        error => {
          this.loading = false;
          console.error('Error al actualizar el consultorio:', error);
          console.log('Objeto de error:', error);

          if (error === 'DUPLICATE_USER') {
            this.loading = false;
            this.registrationMessage = 'El consultorio con este nombre ya existe. Por favor, elija otro nombre.';
            this.toastr.error('El consultorio con ese correo electrónico ya existe.', 'Error de duplicidad');
          } else {
            this.loading = false;
            this.registrationMessage = 'Hubo un error al actualizar los datos del consultorio. Por favor, verifique que los datos estén correctos e inténtelo nuevamente.';
            this.toastr.error('Ocurrió un error al actualizar el consultorio. Por favor, inténtelo de nuevo.', 'Error al actualizar consultorio');
          }
        }
      );
    }
  }

  updateConsult() {
    this.loading = true;
    if (this.id !== null) {
      this.titulo = 'Actualizar datos del consultorio';
      this.consultsService.obtenerConsult(this.id).subscribe(
        (response: any) => {
          console.log('Datos obtenidos del consultorio:', response.data);

          const data = response.data || {};
          const nombreConsult = data.conNombre || 'Tipo doc Desconocido';
          const ubucacionConsult = data.conUbicacion || 'Número Doc Desconocido';
          const especialidaConsult = data.conEspecialidad || 'Nombres Desconocidos';
          const estadoConsult = data.conEstado || 'Apellidos Desconocidos';


          this.titulo = `Actualizar datos de ${nombreConsult}`;

          this. editConsultForm.patchValue({

            
            conEspecialidad: especialidaConsult,
            conEstado: estadoConsult,
          });

          this. editConsultForm.patchValue({
            conNombre: nombreConsult,
            conUbicacion: ubucacionConsult,
          
          });
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.error('Error al obtener datos del consultorio:', error);
        }
      );
    } else {
      this.loading = false;
      this.titulo = 'Crear nuevo consultorio';
    }
  }

  // Función para validar el formato del correo electrónico con expresión regular
/*  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  } */
}
