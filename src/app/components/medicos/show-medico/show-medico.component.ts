import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription, finalize } from 'rxjs';
import { Medico } from 'src/app/models/medico';
import { LoginService } from 'src/app/services/auth/login.service';
import { MedicosService } from 'src/app/services/medicos.service';

@Component({
  selector: 'app-show-medico',
  templateUrl: './show-medico.component.html',
  styleUrl: './show-medico.component.css'
})
export class ShowMedicoComponent implements OnInit, OnDestroy{
  listMedicos: Medico[] = [];
  searchTerm: string = '';


  userLoginOn: boolean = false;
  loading: boolean = true;
  


  private userLoginOnSubscription?: Subscription;

  constructor(private _medicosService: MedicosService, private toastr: ToastrService, private loginService: LoginService) {}



    ngOnDestroy(): void {
      if (this.userLoginOnSubscription) {
        this.userLoginOnSubscription.unsubscribe();
      }
    }
  
    ngOnInit(): void {
      this.obtenerMedico();
      console.log('ngOnInit - listMedicos:', this.listMedicos);
      this.userLoginOnSubscription = this.loginService.currentUserLoginOn.subscribe({
        next: (userLoginOn) => {
          console.log('User login status:', userLoginOn);
          this.userLoginOn = userLoginOn;
        }
      });
  
    }

    obtenerMedico() {
      this.loading = true; // Mostrar el indicador de carga
    this._medicosService.getMedicos()
      .pipe(
        finalize(() => this.loading = false) // Ocultar el indicador de carga, incluso en caso de error
      )
      .subscribe(
        (data: Medico[]) => {
          console.log('Datos obtenido del médico:', data);
          this.listMedicos = data;
        },
        (error) => {
          console.log('Error al obtener datos del médico:', error);if (error.status === 401) {
            console.error('Usuario no autorizado. Redirigir a la página de inicio de sesión.');
            // Puedes redirigir a la página de inicio de sesión u realizar alguna otra acción.
          }
        }
      );
  }
    
    eliminarMedico(id:any) {
      this.loading = true; // Mostrar el indicador de carga durante la eliminación
    this._medicosService.eliminarMedico(id)
      .pipe(
        finalize(() => this.loading = false) // Ocultar el indicador de carga, incluso en caso de error
      )
      .subscribe(
        () => {
          this.toastr.error('El médico fue eliminado con éxito', 'Médico eliminado');
          this.obtenerMedico();
        },
        (error) => {
          if (error.status === 403) {
            this.toastr.error('No tienes permiso suficiente para eliminar un médico', 'Error eliminar médico');
          } else {
            this.toastr.error('Ocurrió un error al eliminar el médico', 'Error eliminar médico');
          }
          console.log(error);
        }
      );
  }
}

