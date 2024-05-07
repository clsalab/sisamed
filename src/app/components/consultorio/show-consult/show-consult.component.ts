import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription, finalize } from 'rxjs';
import { Consult } from 'src/app/models/consultorio';
import { LoginService } from 'src/app/services/auth/login.service';
import { ConsultsService } from 'src/app/services/consults.service';

@Component({
  selector: 'app-show-consult',
  templateUrl: './show-consult.component.html',
  styleUrl: './show-consult.component.css'
})
export class ShowConsultComponent implements OnInit, OnDestroy{
  listConsults: Consult[] = [];
  searchTerm: string = '';


  userLoginOn: boolean = false;
  loading: boolean = true;
  

  private userLoginOnSubscription?: Subscription;

  constructor(private _consultsService: ConsultsService, private toastr: ToastrService, private loginService: LoginService) {}


    ngOnDestroy(): void {
      if (this.userLoginOnSubscription) {
        this.userLoginOnSubscription.unsubscribe();
      }
    }
  
    ngOnInit(): void {
      this.obtenerConsult();
      console.log('ngOnInit - listConsults:', this.listConsults);
      this.userLoginOnSubscription = this.loginService.currentUserLoginOn.subscribe({
        next: (userLoginOn) => {
          console.log('User login status:', userLoginOn);
          this.userLoginOn = userLoginOn;
        }
      });
  
    }

    obtenerConsult() {
      this.loading = true; // Mostrar el indicador de carga
    this._consultsService.getConsults()
      .pipe(
        finalize(() => this.loading = false) // Ocultar el indicador de carga, incluso en caso de error
      )
      .subscribe(
        (data: Consult[]) => {
          console.log('Datos obtenido del Consultorio:', data);
          this.listConsults = data;
        },
        (error) => {
          console.log('Error al obtener datos del Consultorio:', error);if (error.status === 401) {
            console.error('Usuario no autorizado. Redirigir a la página de inicio de sesión.');
            // Puedes redirigir a la página de inicio de sesión u realizar alguna otra acción.
          }
        }
      );
  }
    
    eliminarConsult(id:any) {
      this.loading = true; // Mostrar el indicador de carga durante la eliminación
    this._consultsService.eliminarConsult(id)
      .pipe(
        finalize(() => this.loading = false) // Ocultar el indicador de carga, incluso en caso de error
      )
      .subscribe(
        () => {
          this.toastr.error('El Consultorio fue eliminado con éxito', 'Consultorio eliminado');
          this.obtenerConsult();
        },
        (error) => {
          if (error.status === 403) {
            this.toastr.error('No tienes permiso suficiente para eliminar un Consultorio', 'Error eliminar Consultorio');
          } else {
            this.toastr.error('Ocurrió un error al eliminar el Consultorio', 'Error eliminar Consultorio');
          }
          console.log(error);
        }
      );
  }
}
