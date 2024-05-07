import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Medico } from 'src/app/models/medico';
import { MedicosService } from 'src/app/services/medicos.service';


@Component({
  selector: 'app-edit-medico',
  templateUrl: './edit-medico.component.html',
  styleUrl: './edit-medico.component.css'
})
export class EditMedicoComponent {
  editMedicoForm: FormGroup;
  titulo = 'Actualizar datos del Medico';
  id: string | null;
  loading: boolean = true;
  registrationMessage: string = '';

  constructor( 
    private fb:FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private medicosService: MedicosService,
    private aRouter: ActivatedRoute
      
      ) {
    this.editMedicoForm = this.fb.group({
      medTipoDoc: ['', Validators.required],
      medNumDoc: ['', Validators.required],
      medNombres: ['', Validators.required],
      medApellidos: ['', Validators.required],
      medEspecialidad: ['', Validators.required],
      medFechaNacimiento: [null, Validators.required],
      medSexo: ['', Validators.required],
      medTelefono: ['', Validators.required],
      medCorreo: ['', [Validators.required, Validators.email]],
      medEstado: ['', Validators.required],
      userroles: ['', Validators.required],

    }) 
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.id = this.aRouter.snapshot.paramMap.get('id');
    console.log('ID del Médico:', this.id);
    this.updateMedico();
      
  }

  actualizarMedico() {
    this.loading = true;
    if (this.id !== null) {
      const userEmail = this.editMedicoForm.get('medCorreo')?.value;
      if (!this.validateEmail(userEmail)) {
        this.loading = false;
        this.registrationMessage = 'El correo electrónico no tiene un formato válido.';
        this.toastr.error('El correo electrónico no tiene un formato válido.', 'Error de formato');
        return;
      }
      const medicoActualizado: Medico = {
        medTipoDoc: this.editMedicoForm.get('medTipoDoc')?.value,
        medNumDoc: this.editMedicoForm.get('medNumDoc')?.value,
        medNombres: this.editMedicoForm.get('medNombres')?.value,
        medApellidos: this.editMedicoForm.get('medApellidos')?.value,
        medEspecialidad: this.editMedicoForm.get('medEspecialidad')?.value,
        medFechaNacimiento: this.editMedicoForm.get('medFechaNacimiento')?.value,
        medSexo: this.editMedicoForm.get('medSexo')?.value,
        medTelefono: this.editMedicoForm.get('medTelefono')?.value,
        medCorreo: userEmail,
        medEstado: 'activo',
        userroles: this.editMedicoForm.get('userroles')?.value,
      };

      this.medicosService.updateMedicoData(this.id, medicoActualizado).subscribe(
        data => {
          this.toastr.info('Los cambios fueron guardados con éxito', 'Médico actualizado');
          this.router.navigate(['/panel-admin/items-medicos']);
        },
        error => {
          this.loading = false;
          console.error('Error al actualizar el médico:', error);
          console.log('Objeto de error:', error);

          if (error === 'DUPLICATE_USER') {
            this.loading = false;
            this.registrationMessage = 'El médico con ese correo electrónico ya existe. Por favor, elija otro correo electrónico.';
            this.toastr.error('El médico con ese correo electrónico ya existe.', 'Error de duplicidad');
          } else {
            this.loading = false;
            this.registrationMessage = 'Hubo un error al actualizar los datos del médico. Por favor, verifique que los datos estén correctos e inténtelo nuevamente.';
            this.toastr.error('Ocurrió un error al actualizar el médico. Por favor, inténtelo de nuevo.', 'Error al actualizar médico');
          }
        }
      );
    }
  }

  updateMedico() {
    this.loading = true;
    if (this.id !== null) {
      this.titulo = 'Actualizar datos del médico';
      this.medicosService.obtenerMedico(this.id).subscribe(
        (response: any) => {
          console.log('Datos obtenidos del médico:', response.data);

          const data = response.data || {};
          const tdMedico = data.medTipoDoc || 'Tipo doc Desconocido';
          const numDocMedico = data.medNumDoc || 'Número Doc Desconocido';
          const nombresMedico = data.medNombres || 'Nombres Desconocidos';
          const apellidosMedico = data.medApellidos || 'Apellidos Desconocidos';
          const especialidadMedico = data.medEspecialidad || 'Especialidad Desconocidos';
          const fechNacMedico = data.medFechaNacimiento || 'Fecha nacim Desconocida';
          const generoMedico = data.medSexo || 'Genero Desconocido';
          const movilMedico = data.medTelefono || 'Teléfono Desconocido';
          const emailMedico = data.medCorreo || 'Email Desconocido';
          const estadoMedico = data.medEstado || 'Email Desconocido';
          const rolMedico = data.userroles || 'Roles Desconocidos';

          const fechaNacimiento = new Date(data.medFechaNacimiento);
          const formattedFechaNacimiento = fechaNacimiento.toISOString().split('T')[0];

          this.titulo = `Actualizar datos de ${nombresMedico}`;

          this.editMedicoForm.patchValue({
            medTipoDoc: tdMedico,
            medEspecialidad: especialidadMedico,
            medFechaNacimiento: formattedFechaNacimiento,
            medSexo: generoMedico,
            medEstado: estadoMedico,
            userroles: rolMedico,
          });
          this.editMedicoForm.patchValue({
            
            medNumDoc: numDocMedico,
            medNombres: nombresMedico,
            medApellidos: apellidosMedico,
            medTelefono: movilMedico,
            medCorreo: emailMedico,

          });
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.error('Error al obtener datos del médico:', error);
        }
      );
    } else {
      this.loading = false;
      this.titulo = 'Crear nuevo médico';
    }
  }

  // Función para validar el formato del correo electrónico con expresión regular
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
