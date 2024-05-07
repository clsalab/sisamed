import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Medico } from 'src/app/models/medico';
import { MedicosService } from 'src/app/services/medicos.service';

@Component({
  selector: 'app-create-medico',
  templateUrl: './create-medico.component.html',
  styleUrl: './create-medico.component.css'
})
export class CreateMedicoComponent {
  registrationMessage: string = '';
  medicoDetails: Medico = new Medico('','', 0 ,'', '','','','', 0,'','','');
  loading: Boolean = false;

  medicosForm!: FormGroup;

  

  constructor(private medicosService: MedicosService, private router: Router, private formBuilder: FormBuilder, private toastr: ToastrService) {}

  ngOnInit() {
    this.medicosForm = this.formBuilder.group({
      medTipoDoc: ['', Validators.required],
      medNumDoc: ['', [Validators.required, this.validateNumDoc]],
      medNombres: ['', Validators.required],
      medApellidos: ['', Validators.required],
      medEspecialidad: ['', Validators.required],
      medFechaNacimiento: ['', Validators.required],
      medSexo: ['', Validators.required],
      medTelefono: ['', [Validators.required, this.validateTelefono]],
      medCorreo: ['', [Validators.required, Validators.email, this.validateEmail]],
      medEstado: ['', Validators.required],
      userroles: ['', Validators.required],
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
    if (this.medicosForm.valid) {
      this.medicosService.register(this.medicosForm.value).subscribe(
        (response) => {
          this.medicosForm.reset();
          this.registrationMessage = '¡Medico registrado con éxito!';
          this.toastr.success(this.registrationMessage, 'Registro Exitoso');
          this.loading = false;
          this.router.navigateByUrl('/panel-admin/items-medicos');
        },
        (error) => { this.loading = false;
          console.error('Error en el registro:', error);

          // Mostrar mensajes de error específicos según el tipo de error
          if (error === 'DUPLICATE_MEDICO') { this.loading = false;
            this.registrationMessage = 'El medico con este número de documento ya existe. Por favor, comuniquese con el administrador del sistema.';
          } else if (error === 'ERROR_REGISTER_MEDICO') { this.loading = false;
            this.registrationMessage = 'Hubo un error al registrar el medico. Por favor, verifique que los datos estén correctos e inténtelo nuevamente.';
          } else { this.loading = false;
            this.registrationMessage = 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo.';
          }
          this.loading = false;
          this.toastr.error(this.registrationMessage, 'Error al registrar el medico');
        }
      );
    } else { this.loading = false;
      this.medicosForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.loading = true;
    this.medicosForm.reset();
    this.loading = false
    console.log('Registro cancelado');
  }

}
