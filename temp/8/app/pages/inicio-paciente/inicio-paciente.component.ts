// inicio-paciente.component.ts

import { Component } from '@angular/core';
import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from 'src/app/models/paciente';

@Component({
  selector: 'app-inicio-paciente',
  templateUrl: './inicio-paciente.component.html',
  styleUrls: ['./inicio-paciente.component.css']
})
export class InicioPacienteComponent {
  pacientes: Paciente[] = [];
  idConsulta: string = '';
  paciente: Paciente | null = null;

  constructor(private pacienteService: PacienteService) {}
  
  consultarPaciente() {
    const pacienteId = this.idConsulta;

    this.pacienteService.getPacienteById(pacienteId).subscribe(
      (data) => {
        this.paciente = data;
        console.log('Datos del paciente consultado:', this.paciente);
      },
      (error) => {
        console.error('Error al obtener datos del paciente', error);
        alert('Error al obtener datos del paciente');
      }
    );
  }

  verDetalles(paciente: Paciente) {
    console.log('Detalles del paciente:', paciente);
  }

  editarPacienteFormulario(paciente: Paciente) {
    // Copia los datos del paciente para que los cambios no se reflejen directamente en el objeto original
    this.paciente = { ...paciente };
  }

  editarPaciente() {
    // Lógica para enviar los cambios al servidor, por ejemplo, usando un servicio
    if (this.paciente) {
      this.pacienteService.editarPaciente(this.paciente).subscribe(
        (response: any) => {
          console.log('Paciente editado exitosamente', response);
          // Actualizar la lista de pacientes después de la edición
          this.consultarPacientes();
        },
        (error: any) => {
          console.error('Error al editar paciente', error);
          alert('Error al editar paciente');
        }
      );
    }
  }

  eliminarPaciente(paciente: Paciente) {
    console.log('Eliminar paciente:', paciente);
  }

  private consultarPacientes() {
    this.pacienteService.getPacientes().subscribe(
      (data) => {
        this.pacientes = data;
      },
      (error) => {
        console.error('Error al obtener lista de pacientes', error);
      }
    );
  }
}
