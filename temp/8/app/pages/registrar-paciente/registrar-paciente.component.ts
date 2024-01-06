import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-paciente',
  templateUrl: './registrar-paciente.component.html',
  styleUrls: ['./registrar-paciente.component.css'],
})
export class RegistrarPacienteComponent implements OnInit {
  pacienteForm!: FormGroup; // Agrega el modificador '!' para indicar que será inicializado

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.pacienteForm = this.fb.group({
      pacTipoDoc: ['', Validators.required],
      pacNumDoc: ['', Validators.required],
      pacNombres: ['', Validators.required],
      // Agrega más campos según sea necesario
    });
  }

  registrarPaciente(): void {
    // Lógica para registrar al paciente
  }
}
