import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription, finalize } from 'rxjs';
import { Paciente } from 'src/app/models/paciente';
import { LoginService } from 'src/app/services/auth/login.service';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-show-pacientes',
  templateUrl: './show-pacientes.component.html',
  styleUrls: ['./show-pacientes.component.css']
})
export class ShowPacientesComponent implements OnInit, OnDestroy{
  listPacientes: Paciente[] = [];
  searchTerm: string = '';


  userLoginOn: boolean = false;
  loading: boolean = true;
  

  private userLoginOnSubscription?: Subscription;

  constructor(private _pacientesService: PacientesService, private toastr: ToastrService, private loginService: LoginService) {}


    ngOnDestroy(): void {
      if (this.userLoginOnSubscription) {
        this.userLoginOnSubscription.unsubscribe();
      }
    }
  
    ngOnInit(): void {
      this.obtenerPaciente();
      console.log('ngOnInit - listPacientes:', this.listPacientes);
      this.userLoginOnSubscription = this.loginService.currentUserLoginOn.subscribe({
        next: (userLoginOn) => {
          console.log('User login status:', userLoginOn);
          this.userLoginOn = userLoginOn;
        }
      });
  
    }

    obtenerPaciente() {
      this.loading = true; // Mostrar el indicador de carga
    this._pacientesService.getPacientes()
      .pipe(
        finalize(() => this.loading = false) // Ocultar el indicador de carga, incluso en caso de error
      )
      .subscribe(
        (data: Paciente[]) => {
          console.log('Datos de pacientes obtenidos:', data);
          this.listPacientes = data;
        },
        (error) => {
          console.log('Error al obtener pacientes:', error);if (error.status === 401) {
            console.error('Usuario no autorizado. Redirigir a la página de inicio de sesión.');
            // Puedes redirigir a la página de inicio de sesión u realizar alguna otra acción.
          }
        }
      );
  }
    
    eliminarPaciente(id:any) {
      this.loading = true; // Mostrar el indicador de carga durante la eliminación
    this._pacientesService.eliminarPaciente(id)
      .pipe(
        finalize(() => this.loading = false) // Ocultar el indicador de carga, incluso en caso de error
      )
      .subscribe(
        () => {
          this.toastr.error('El paciente fue eliminado con éxito', 'Paciente eliminado');
          this.obtenerPaciente();
        },
        (error) => {
          if (error.status === 403) {
            this.toastr.error('No tienes permiso suficiente para eliminar un paciente', 'Error eliminar paciente');
          } else {
            this.toastr.error('Ocurrió un error al eliminar el paciente', 'Error eliminar paciente');
          }
          console.log(error);
        }
      );
  }
}
