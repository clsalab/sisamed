// pacientes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable,throwError } from 'rxjs';
import { Paciente } from '../models/paciente';
import { catchError } from 'rxjs/operators';
import { ConstantUri } from '../utils/contantUri';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
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

    return this.http.post(`${ConstantUri.baseUrl}/auth/login`, credentials, { headers, withCredentials: true }).pipe(
      catchError((error: any) => {
        console.error('Error en el inicio de sesión:', error);
        
        // Verifica si el error contiene un mensaje específico del servidor
        const errorMessage = error.error && error.error.error ? error.error.error : 'Error en el inicio de sesión. Por favor, inténtelo de nuevo.';
        
        return throwError(errorMessage);
      })
    );
  }


  getPacientes(): Observable<Paciente[]> {
      const headers = this.getHeadersWithToken();
      return this.http.get<{ data: Paciente[] }>(`${ConstantUri.baseUrl}/paciente`, { headers }).pipe(
      map(response => response.data)
    );
  }

  register(PacienteDetails: any): Observable<any> {
    console.log('Datos que se están enviando al servidor:', PacienteDetails);
    const registerUrl = `${ConstantUri.pacienteUrl}`;
    const headers = this.getHeadersWithToken();

    return this.http.post(registerUrl, PacienteDetails, { headers }).pipe(
      catchError((error: any) => {
        console.error('Error en el registro:', error);
         // Verifica si el error contiene un mensaje específico del servidor
         const errorMessage = error.error && error.error.error ? error.error.error : 'Error en el registro. Por favor, inténtelo de nuevo.';
        return throwError(errorMessage); //se cambio el mensaje  
      })
    );
  }



  updatePacienteData(id: string, updatedData: any): Observable<any> {
    const headers = this.getHeaders();
  
    return this.http.put(`${ConstantUri.pacienteUrl}/${id}`, updatedData, { headers }).pipe(
      catchError((error: any) => {
        console.error('Error al actualizar el usuario:', error);
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

  eliminarPaciente(id:string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${ConstantUri.pacienteUrl}/${id}`, { headers});
  }

  guardarPaciente(user: Paciente): Observable<any> {
    return this.http.post(ConstantUri.baseUrl, user);
  }
  
  obtenerPaciente(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<Paciente>(`${ConstantUri.pacienteUrl}/${id}`, { headers}).pipe(
      catchError((error: any) => {
        console.error('Error al obtener datos del paciente:', error);
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