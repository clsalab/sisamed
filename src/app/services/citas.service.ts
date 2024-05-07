import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConstantUri } from '../utils/contantUri';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Consult } from '../models/consultorio';
import { Medico } from '../models/medico';
import { Paciente } from '../models/paciente';
import { Cita } from '../models/cita';

@Injectable({
    providedIn: 'root'
})
export class CitasService {
    isHandset$: Observable<boolean>; 
    private apiUrl = `${ConstantUri.baseUrl}`;

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
    private getHeaders(): HttpHeaders {
        const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    return headers;  
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

    obtenerInformacionPaciente(idPaciente: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/pacientes/${idPaciente}`);
    }
    
    obtenerInformacionMedico(idMedico: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/medicos/${idMedico}`);
    }
    
    obtenerInformacionConsultorio(idConsultorio: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/consultorios/${idConsultorio}`);
    }
    getConsults(): Observable<Consult[]> {
        const headers = this.getHeadersWithToken();
        return this.http.get<{ data: Consult[] }>(`${ConstantUri.consultUrl}`, { headers }).pipe(
        map(response => response.data)
    );
    }
    obtenerConsult(id: string): Observable<any> {
        const headers = this.getHeaders();
        return this.http.get<Consult>(`${ConstantUri.consultUrl}/${id}`, { headers}).pipe(
        catchError((error: any) => {
            console.error('Error al obtener datos del consultorio:', error);
            return throwError(error);
        })
        );
    }
    
    getMedicos(): Observable<Medico[]> {
        const headers = this.getHeadersWithToken();
        return this.http.get<{ data: Medico[] }>(`${ConstantUri.medicoUrl}`, { headers }).pipe(
        map(response => response.data)
    );
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
    getPacientes(): Observable<Paciente[]> {
        const headers = this.getHeadersWithToken();
        return this.http.get<{ data: Paciente[] }>(`${ConstantUri.baseUrl}/paciente`, { headers }).pipe(
        map(response => response.data)
    );
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

    guardarCita(user: Cita): Observable<any> {
        return this.http.post(ConstantUri.baseUrl, user);
    }

    registerCita(CitaDetails: any): Observable<any> {
        console.log('Datos que se están enviando al servidor:', CitaDetails);
        const registerUrl = `${ConstantUri.citaUrl}`;
        const headers = this.getHeadersWithToken();
    
        return this.http.post(registerUrl, CitaDetails, { headers }).pipe(
        catchError((error: any) => {
            console.error('Error en el registro:', error);
             // Verifica si el error contiene un mensaje específico del servidor
            const errorMessage = error.error && error.error.error ? error.error.error : 'Error en el registro. Por favor, inténtelo de nuevo.';
            return throwError(errorMessage); //se cambio el mensaje  
        })
        );
    }

}
