import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, finalize } from 'rxjs';
import { Consult } from 'src/app/models/consultorio';
import { Medico } from 'src/app/models/medico';
import { Paciente } from 'src/app/models/paciente';
import { LoginService } from 'src/app/services/auth/login.service';
import { CitasService } from 'src/app/services/citas.service';


@Component({
  selector: 'app-create-cita',
  templateUrl: './create-cita.component.html',
  styleUrl: './create-cita.component.css'
})
export class CreateCitaComponent implements OnInit {
  pacientesForm: FormGroup;
/*   medicosForm: FormGroup;
  consultForm: FormGroup; */
  medicoSeleccionado: any;
  consultorioSeleccionado: any;
/*   fechaCita: Date;
  horaCita: string; */
  pacientes: any[] = [];
  edad: any[] = [];
  medicos: any[] = [];
  consultorios: any[] = [];
  pacienteSeleccionado: any;
  loading: boolean = true;
  searchTerm: string = '';
  userLoginOn: boolean = false;
  id: string | null;
  registrationMessage: string = '';
  private userLoginOnSubscription?: Subscription;

  constructor(
    private fb:FormBuilder,
    private router: Router,
    private citasService: CitasService,
    private toastr: ToastrService,
    private loginService: LoginService,
    private aRouter: ActivatedRoute
    ) {
      this.pacientesForm = this.fb.group({
        pacTipoDoc: ['', Validators.required],
        pacNumDoc: ['', Validators.required],
        pacNombres: ['', Validators.required],
        pacApellidos: ['', Validators.required],
        pacFechaNacimiento: [null, Validators.required],
        pacSexo: ['', Validators.required],
        pacTelefono: ['', Validators.required],
        pacCorreo: ['', [Validators.required, Validators.email]],
        pacEPS: ['', Validators.required],
  
      }) 
      this.id = this.aRouter.snapshot.paramMap.get('id');  
    }

  ngOnDestroy(): void {
    if (this.userLoginOnSubscription) {
      this.userLoginOnSubscription.unsubscribe();
    }
  }

  ngOnInit():  void {
    this.id = this.aRouter.snapshot.paramMap.get('id');
    console.log('ID del Paciente:', this.id);
    this.asignarCita();
    this.obtenerPacientes();
    this.obtenerMedicos();
    this.obtenerConsultorios();
    console.log('ngOnInit - listPacientes:', this.pacientesForm,/* 
    'ngOnInit - listMedicos:', this.medicosForm, 
    'ngOnInit - listConsultorio:', this.consultForm); */)
      this.userLoginOnSubscription = this.loginService.currentUserLoginOn.subscribe({
        next: (userLoginOn) => {
          console.log('User login status:', userLoginOn);
          this.userLoginOn = userLoginOn;
        }
      });
  }

  obtenerPacientes() {
    this.loading = true; // Mostrar el indicador de carga
    // Llama al servicio para obtener información de pacientes
    this.citasService.getPacientes()
    .pipe(
      finalize(() => this.loading = false) // Ocultar el indicador de carga, incluso en caso de error
    )
    .subscribe(
      (data: Paciente[]) => {
        console.log('Datos de pacientes obtenidos:', data);
        this.pacientes = data;
      },
      (error) => {
        console.log('Error al obtener pacientes:', error);if (error.status === 401) {
          console.error('Usuario no autorizado. Redirigir a la página de inicio de sesión.');
          // Puedes redirigir a la página de inicio de sesión u realizar alguna otra acción.
        }
      }
    );
  }

  obtenerMedicos() {
    this.loading = true; // Mostrar el indicador de carga
    this.citasService.getMedicos()
      .pipe(
        finalize(() => this.loading = false) // Ocultar el indicador de carga, incluso en caso de error
      )
      .subscribe(
        (data: Medico[]) => {
          console.log('Datos obtenido del médico:', data);
          this.medicos = data;
        },
        (error) => {
          console.log('Error al obtener datos del médico:', error);if (error.status === 401) {
            console.error('Usuario no autorizado. Redirigir a la página de inicio de sesión.');
            // Puedes redirigir a la página de inicio de sesión u realizar alguna otra acción.
          }
        }
      );
  }

  obtenerConsultorios() {
    this.loading = true; // Mostrar el indicador de carga
    this.citasService.getConsults()
      .pipe(
        finalize(() => this.loading = false) // Ocultar el indicador de carga, incluso en caso de error
      )
      .subscribe(
        (data: Consult[]) => {
          console.log('Datos obtenido del Consultorio:', data);
          this.consultorios = data;
        },
        (error) => {
          console.log('Error al obtener datos del Consultorio:', error);if (error.status === 401) {
            console.error('Usuario no autorizado. Redirigir a la página de inicio de sesión.');
            // Puedes redirigir a la página de inicio de sesión u realizar alguna otra acción.
          }
        }
      );
  }
 

  asignarCita() {
    this.loading = true;
    if (this.id !== null) {
      this.citasService.obtenerPaciente(this.id).subscribe(
        (response: any) => {
          console.log('Datos obtenidos del paciente:', response.data);

          const dataPaciente = response.data || {};
          const tdPaciente = dataPaciente.pacTipoDoc || 'Tipo doc Desconocido';
          const numDocPaciente = dataPaciente.pacNumDoc || 'Número Doc Desconocido';
          const nombresPaciente = dataPaciente.pacNombres || 'Nombres Desconocidos';
          const apellidosPaciente = dataPaciente.pacApellidos || 'Apellidos Desconocidos';
          const fechNacPaciente = dataPaciente.pacFechaNacimiento || 'Fecha nacim Desconocida';
          const generoPaciente = dataPaciente.pacSexo || 'Genero Desconocido';
          const movilPaciente = dataPaciente.pacTelefono || 'Teléfono Desconocido';
          const emailPaciente = dataPaciente.pacCorreo || 'Email Desconocido';
          const epsPaciente = dataPaciente.pacEPS || ' Desconocido';

          
          const fechaNacimiento = new Date(dataPaciente.pacFechaNacimiento);
          const formattedFechaNacimiento = fechaNacimiento.toISOString().split('T')[0];

          this.pacientesForm.patchValue({
            pacTipoDoc: tdPaciente,
            pacFechaNacimiento: formattedFechaNacimiento,
            pacSexo: generoPaciente,
          });
          this.pacientesForm.patchValue({
            
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
    }

  }

}
