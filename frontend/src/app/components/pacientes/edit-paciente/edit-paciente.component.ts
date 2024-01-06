import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from 'src/app/models/paciente';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-edit-paciente',
  templateUrl: './edit-paciente.component.html',
  styleUrl: './edit-paciente.component.css'
})
export class EditPacienteComponent {

  editPacienteForm: FormGroup;
  titulo = 'Actualizar datos del Paciente';
  id: string | null;
  loading: boolean = true;
  registrationMessage: string = '';

  constructor( 
    private fb:FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private pacientesService: PacientesService,
    private aRouter: ActivatedRoute
    
    ) {
    this.editPacienteForm = this.fb.group({
      pacTipoDoc: ['', Validators.required],
      pacNumDoc: ['', Validators.required],
      pacNombres: ['', Validators.required],
      pacApellidos: ['', Validators.required],
      pacFechaNacimiento: [null, Validators.required],
      pacSexo: ['', Validators.required],
      pacTelefono: ['', Validators.required],
      pacCorreo: ['', [Validators.required, Validators.email]],
      pacEPS: ['', Validators.required],
      pacEstado: ['', Validators.required],
      userroles: ['', Validators.required],

    }) 
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.id = this.aRouter.snapshot.paramMap.get('id');
    console.log('ID del Paciente:', this.id);
    this.updatePaciente();
      
  }

  actualizarPaciente() {
    this.loading = true;
    if (this.id !== null) {
      const userEmail = this.editPacienteForm.get('pacCorreo')?.value;
      if (!this.validateEmail(userEmail)) {
        this.loading = false;
        this.registrationMessage = 'El correo electrónico no tiene un formato válido.';
        this.toastr.error('El correo electrónico no tiene un formato válido.', 'Error de formato');
        return;
      }
      const pacienteActualizado: Paciente = {
        pacTipoDoc: this.editPacienteForm.get('pacTipoDoc')?.value,
        pacNumDoc: this.editPacienteForm.get('pacNumDoc')?.value,
        pacNombres: this.editPacienteForm.get('pacNombres')?.value,
        pacApellidos: this.editPacienteForm.get('pacApellidos')?.value,
        pacFechaNacimiento: this.editPacienteForm.get('pacFechaNacimiento')?.value,
        pacSexo: this.editPacienteForm.get('pacSexo')?.value,
        pacTelefono: this.editPacienteForm.get('pacTelefono')?.value,
        pacCorreo: userEmail,
        pacEPS: this.editPacienteForm.get('pacEPS')?.value,
        pacEstado: 'activo',
        userroles: this.editPacienteForm.get('userroles')?.value,
      };

      this.pacientesService.updatePacienteData(this.id, pacienteActualizado).subscribe(
        data => {
          this.toastr.info('Los cambios fueron guardados con éxito', 'Paciente actualizado');
          this.router.navigate(['/panel-admin']);
        },
        error => {
          this.loading = false;
          console.error('Error al actualizar el paciente:', error);
          console.log('Objeto de error:', error);

          if (error === 'DUPLICATE_USER') {
            this.loading = false;
            this.registrationMessage = 'El paciente con ese correo electrónico ya existe. Por favor, elija otro correo electrónico.';
            this.toastr.error('El paciente con ese correo electrónico ya existe.', 'Error de duplicidad');
          } else {
            this.loading = false;
            this.registrationMessage = 'Hubo un error al actualizar los datos del paciente. Por favor, verifique que los datos estén correctos e inténtelo nuevamente.';
            this.toastr.error('Ocurrió un error al actualizar el paciente. Por favor, inténtelo de nuevo.', 'Error al actualizar paciente');
          }
        }
      );
    }
  }

  updatePaciente() {
    this.loading = true;
    if (this.id !== null) {
      this.titulo = 'Actualizar datos del paciente';
      this.pacientesService.obtenerPaciente(this.id).subscribe(
        (response: any) => {
          console.log('Datos obtenidos del paciente:', response.data);

          const data = response.data || {};
          const tdPaciente = data.pacTipoDoc || 'Tipo doc Desconocido';
          const numDocPaciente = data.pacNumDoc || 'Número Doc Desconocido';
          const nombresPaciente = data.pacNombres || 'Nombres Desconocidos';
          const apellidosPaciente = data.pacApellidos || 'Apellidos Desconocidos';
          const fechNacPaciente = data.pacFechaNacimiento || 'Fecha nacim Desconocida';
          const generoPaciente = data.pacSexo || 'Genero Desconocido';
          const movilPaciente = data.pacTelefono || 'Teléfono Desconocido';
          const emailPaciente = data.pacCorreo || 'Email Desconocido';
          const epsPaciente = data.pacEPS || ' Desconocido';
          const estadoPaciente = data.pacEstado || 'Email Desconocido';
          const rolPaciente = data.userroles || 'Roles Desconocidos';

          const fechaNacimiento = new Date(data.pacFechaNacimiento);
          const formattedFechaNacimiento = fechaNacimiento.toISOString().split('T')[0];

          this.titulo = `Actualizar datos de ${nombresPaciente}`;

          this.editPacienteForm.patchValue({
            pacTipoDoc: tdPaciente,
            pacFechaNacimiento: formattedFechaNacimiento,
            pacSexo: generoPaciente,
            pacEstado: estadoPaciente,
            userroles: rolPaciente,
          });
          this.editPacienteForm.patchValue({
            
            pacNumDoc: numDocPaciente,
            pacNombres: nombresPaciente,
            pacApellidos: apellidosPaciente,
            pacTelefono: movilPaciente,
            pacCorreo: emailPaciente,
            pacEPS: epsPaciente,
          });
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.error('Error al obtener datos del paciente:', error);
        }
      );
    } else {
      this.loading = false;
      this.titulo = 'Crear nuevo Paciente';
    }
  }

  // Función para validar el formato del correo electrónico con expresión regular
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
