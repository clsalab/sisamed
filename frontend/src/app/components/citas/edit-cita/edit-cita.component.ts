import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitasService } from 'src/app/services/citas.service';


@Component({
  selector: 'app-edit-cita',
  templateUrl: './edit-cita.component.html',
  styleUrl: './edit-cita.component.css'
})
export class EditCitaComponent implements OnInit {
  pacienteSeleccionado: any;
  medicoSeleccionado: any;
  consultorioSeleccionado: any;
  fechaCita: Date | null = null;  // Asignamos null como valor inicial
  horaCita: string | null = null;

  pacientes: any[] = [];
  medicos: any[] = [];
  consultorios: any[] = [];

  constructor(private citasService: CitasService, private router: Router) {}

  ngOnInit() {
    this.obtenerInformacionPacientes();
    this.obtenerInformacionMedicos();
    this.obtenerInformacionConsultorios();
  }

  obtenerInformacionPacientes() {
    this.citasService.getPacientes().subscribe((pacientes) => {
      this.pacientes = pacientes;
    });
  }

  obtenerInformacionMedicos() {
    this.citasService.getMedicos().subscribe((medicos) => {
      this.medicos = medicos;
    });
  }

  obtenerInformacionConsultorios() {
    this.citasService.getConsults().subscribe((consultorios) => {
      this.consultorios = consultorios;
    });
  }

  asignarCita() {
    if (this.pacienteSeleccionado && this.medicoSeleccionado && this.consultorioSeleccionado && this.fechaCita && this.horaCita) {
      const cita = {
        paciente: this.pacienteSeleccionado,
        medico: this.medicoSeleccionado,
        consultorio: this.consultorioSeleccionado,
        fecha: this.fechaCita,
        hora: this.horaCita
      };

      // Aquí puedes llamar al servicio para guardar la cita en la base de datos
      this.citasService.registerCita(cita).subscribe(
        (resultado) => {
          console.log('Cita asignada correctamente:', resultado);
          // Puedes redirigir a otra página o realizar acciones adicionales después de asignar la cita
          this.router.navigate(['/items-citas']);

          this.limpiarFormulario();
        },
        (error) => {
          console.error('Error al asignar la cita:', error);
          // Manejar el error de manera apropiada
        }
      );
    } else {
      console.warn('Por favor, complete todos los campos antes de asignar la cita.');
    }
  }
  limpiarFormulario() {
    this.pacienteSeleccionado = null;
    this.medicoSeleccionado = null;
    this.consultorioSeleccionado = null;
    this.fechaCita = null;
    this.horaCita = null;
  }
}
