import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConstantUri } from '../utils/contantUri';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Medico } from '../models/medico';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  isHandset$: Observable<boolean>;  

  constructor(
    private http: HttpClient,
    private breakpointObserver: BreakpointObserver   
    ) { 
      this.isHandset$ = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map(result => result.matches));
    
  }
  getIsHandset$() {
    return this.isHandset$;
  }

  login(credentials: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${ConstantUri.loginUserUrl}`, credentials, { headers, withCredentials: true }).pipe(
      catchError((error: any) => {
        console.error('Error en el inicio de sesión:', error);
        
        // Verifica si el error contiene un mensaje específico del servidor
        const errorMessage = error.error && error.error.error ? error.error.error : 'Error en el inicio de sesión. Por favor, inténtelo de nuevo.';
        
        return throwError(errorMessage);
      })
    );
  }


  getMedicos(): Observable<Medico[]> {
      const headers = this.getHeadersWithToken();
      return this.http.get<{ data: Medico[] }>(`${ConstantUri.medicoUrl}`, { headers }).pipe(
      map(response => response.data)
    );
  }

  register(MedicoDetails: any): Observable<any> {
    console.log('Datos que se están enviando al servidor:', MedicoDetails);
    const registerUrl = `${ConstantUri.medicoUrl}`;
    const headers = this.getHeadersWithToken();

    return this.http.post(registerUrl, MedicoDetails, { headers }).pipe(
      catchError((error: any) => {
        console.error('Error en el registro:', error);
         // Verifica si el error contiene un mensaje específico del servidor
        const errorMessage = error.error && error.error.error ? error.error.error : 'Error en el registro. Por favor, inténtelo de nuevo.';
        return throwError(errorMessage); //se cambio el mensaje  
      })
    );
  }



  updateMedicoData(id: string, updatedData: any): Observable<any> {
    const headers = this.getHeaders();
  
    return this.http.put(`${ConstantUri.medicoUrl}/${id}`, updatedData, { headers }).pipe(
      catchError((error: any) => {
        console.error('Error al actualizar el medico:', error);
        console.log('Objeto de error en el servicio:', error);
  
        // Verifica si el error es de duplicidad y lanza un nuevo error con la clave 'DUPLICATE_Paciente'
        const errorMessage = error.error && error.error.error ? error.error.error : 'Error en actualizar el registro. Por favor, inténtelo de nuevo.';
        return throwError(errorMessage);
      })
    );
  }
  


  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    return headers;  
  }

  eliminarMedico(id:string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${ConstantUri.medicoUrl}/${id}`, { headers});
  }

  guardarMedico(user: Medico): Observable<any> {
    return this.http.post(ConstantUri.baseUrl, user);
  }
  
  obtenerMedico(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<Medico>(`${ConstantUri.medicoUrl}/${id}`, { headers}).pipe(
      catchError((error: any) => {
        console.error('Error al obtener datos del medico:', error);
        return throwError(error);
      })
    );
  }
  

  private getHeadersWithToken(): HttpHeaders {
    const token = localStorage.getItem('token');

    if (token) {
      console.log('Token capturado:', token);
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    } else {
      // Manejar el caso en el que no haya un token disponible
      console.error('Token de usuario no disponible');
      return new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
  }

}
