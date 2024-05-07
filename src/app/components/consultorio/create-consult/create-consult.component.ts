import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Consult } from 'src/app/models/consultorio';
import { ConsultsService } from 'src/app/services/consults.service';


@Component({
  selector: 'app-create-consult',
  templateUrl: './create-consult.component.html',
  styleUrl: './create-consult.component.css'
})
export class CreateConsultComponent {
  registrationMessage: string = '';
  consultDetails: Consult = new Consult('','','','','');
  loading: Boolean = false;

  consultsForm!: FormGroup;

  

  constructor(private consultsService: ConsultsService, private router: Router, private formBuilder: FormBuilder, private toastr: ToastrService) {}

  ngOnInit() {
    this.consultsForm = this.formBuilder.group({
      conNombre: ['', Validators.required],
      conUbicacion: ['', Validators.required,],
      conEspecialidad: ['', Validators.required],
      conEstado: ['', Validators.required],
      
    });
  }
  
  /* validateNumDoc(control: AbstractControl): { [key: string]: any } | null {
    const numDoc = control.value;
    if (numDoc && (isNaN(numDoc) || numDoc < 100000 || numDoc > 999999999999)) {
      return { 'invalidNumDoc': true, 'message': 'El número de documento debe tener entre 6 y 12 dígitos, sin puntos y sin comas' };
    }
    return null;
  } */
  
/*  validateTelefono(control: AbstractControl): { [key: string]: any } | null {
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
  } */
  

  register(): void {
    this.loading = true;
    if (this.consultsForm.valid) {
      this.consultsService.register(this.consultsForm.value).subscribe(
        (response) => {
          this.consultsForm.reset();
          this.registrationMessage = '¡Consultorio registrado con éxito!';
          this.toastr.success(this.registrationMessage, 'Registro Exitoso');
          this.loading = false;
          this.router.navigateByUrl('/panel-admin/items-consults');
        },
        (error) => { this.loading = false;
          console.error('Error en el registro:', error);

          // Mostrar mensajes de error específicos según el tipo de error
          if (error === 'DUPLICATE_CONSULTS') { this.loading = false;
            this.registrationMessage = 'El consultorio con este número de registro ya existe. Por favor, comuniquese con el administrador del sistema.';
          } else if (error === 'ERROR_REGISTER_CONSULTS') { this.loading = false;
            this.registrationMessage = 'Hubo un error al registrar el consultorio. Por favor, verifique que los datos estén correctos e inténtelo nuevamente.';
          } else { this.loading = false;
            this.registrationMessage = 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo.';
          }
          this.loading = false;
          this.toastr.error(this.registrationMessage, 'Error al registrar el consultorio');
        }
      );
    } else { this.loading = false;
      this.consultsForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.loading = true;
    this.consultsForm.reset();
    this.loading = false
    console.log('Registro cancelado');
  }

}