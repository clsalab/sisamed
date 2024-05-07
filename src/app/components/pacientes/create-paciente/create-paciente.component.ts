import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from 'src/app/models/paciente';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-create-paciente',
  templateUrl: './create-paciente.component.html',
  styleUrl: './create-paciente.component.css'
})
export class CreatePacienteComponent {
  registrationMessage: string = '';
  pacienteDetails: Paciente = new Paciente('', '', 0 , '', '', '', '', 0, '', '');
  loading: Boolean = false;

  pacientesForm!: FormGroup;

  

  constructor(private pacientesService: PacientesService, private router: Router, private formBuilder: FormBuilder, private toastr: ToastrService) {}

  ngOnInit() {
    this.pacientesForm = this.formBuilder.group({
      pacTipoDoc: ['', Validators.required],
      pacNumDoc: ['', [Validators.required, this.validateNumDoc]],
      pacNombres: ['', Validators.required],
      pacApellidos: ['', Validators.required],
      pacFechaNacimiento: ['', Validators.required],
      pacSexo: ['', Validators.required],
      pacTelefono: ['', [Validators.required, this.validateTelefono]],
      pacCorreo: ['', [Validators.required, Validators.email, this.validateEmail]],
      pacEPS: ['', Validators.required],
    });
  }
  
  validateNumDoc(control: AbstractControl): { [key: string]: any } | null {
    const numDoc = control.value;
    if (numDoc && (isNaN(numDoc) || numDoc < 100000 || numDoc > 999999999999)) {
      return { 'invalidNumDoc': true, 'message': 'El número de documento debe tener entre 6 y 12 dígitos, sin puntos y sin comas' };
    }
    return null;
  }
  
  validateTelefono(control: AbstractControl): { [key: string]: any } | null {
    const telefono = control.value;
    if (telefono && (isNaN(telefono) || telefono < 1000000 || telefono > 9999999999)) {
      return { 'invalidTelefono': true, 'message': 'El número de teléfono debe tener entre 7 y 10 dígitos,sin puntos, sin comas y sin guion' };
    }
    return null;
  }

  validateEmail(control: AbstractControl): { [key: string]: any } | null {
    const email = control.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    if (email && !emailRegex.test(email)) {
      return { 'invalidEmail': true, 'message': 'El correo electrónico debe tener un formato válido.' };
    }
  
    return null;
  }
  

  register(): void {
    this.loading = true;
    if (this.pacientesForm.valid) {
      this.pacientesService.register(this.pacientesForm.value).subscribe(
        (response) => {
          this.pacientesForm.reset();
          this.registrationMessage = '¡Paciente registrado con éxito!';
          this.toastr.success(this.registrationMessage, 'Registro Exitoso');
          this.loading = false;
          this.router.navigateByUrl('/panel-admin/items-pacientes');
        },
        (error) => { this.loading = false;
          console.error('Error en el registro:', error);

          // Mostrar mensajes de error específicos según el tipo de error
          if (error === 'DUPLICATE_PACIENTE') { this.loading = false;
            this.registrationMessage = 'El paciente con este número de documento ya existe. Por favor, comuniquese con el administrador del sistema.';
          } else if (error === 'ERROR_REGISTER_PACIENTE') { this.loading = false;
            this.registrationMessage = 'Hubo un error al registrar el paciente. Por favor, verifique que los datos estén correctos e inténtelo nuevamente.';
          } else { this.loading = false;
            this.registrationMessage = 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo.';
          }
          this.loading = false;
          this.toastr.error(this.registrationMessage, 'Error al registrar el paciente');
        }
      );
    } else { this.loading = false;
      this.pacientesForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.loading = true;
    this.pacientesForm.reset();
    this.loading = false
    console.log('Registro cancelado');
  }

  /* get pacname() {
    return this.pacientesForm.get('pacname');
  }

  get pacemail() {
    return this.pacientesForm.get('pacemail');
  }

  get pacpassword() {
    return this.pacientesForm.get('pacpassword');
  } */
} 

