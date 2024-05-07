import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from "../../services/empleado.service";
import { NgForm } from '@angular/forms';
import { Empleado } from 'src/app/models/empleado';
 
declare var M: any;
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  providers: [EmpleadoService]
})
export class EmpleadosComponent implements OnInit {
 
  constructor(public empleadoService: EmpleadoService) { }
  ngOnInit(): void {
  }
  agregarEmpleado(form?: NgForm) {
    this.empleadoService.PostEmpleado(form?.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Guardado satisfactoriamente'});
      });
  }
  // Limpiar el formulario, recibe un formulario como parametro
  resetForm(form?: NgForm) {
    if (form) {
      form.resetForm({
        name: '',
        position: '',
        office: '',
        salary: null
      });
      this.empleadoService.selectedEmpleado = new Empleado();
    }
  }
}