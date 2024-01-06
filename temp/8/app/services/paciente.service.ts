// paciente.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente';
import { LoginService } from './auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiUrl = 'http://localhost:3001/api/paciente';

  constructor(private httpClient: HttpClient, private loginService: LoginService) {}

  private getHeaders(): HttpHeaders {
    // Include the token in the headers if the user is logged in
    if (this.loginService.isLoggedIn()) {
      const token = (this.loginService as any)['getUserToken']();
      return new HttpHeaders({ Authorization: `Bearer ${token}` });
    }
    return new HttpHeaders();
  }

  getPacientes(): Observable<Paciente[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<Paciente[]>(this.apiUrl, { headers });
  }

  getPacienteById(id: string): Observable<Paciente> {
    const headers = this.getHeaders();
    return this.httpClient.get<Paciente>(`${this.apiUrl}/${id}`, { headers });
  }

  editarPaciente(paciente: Paciente): Observable<Paciente> {
    return this.httpClient.put<Paciente>(`${this.apiUrl}/${paciente._id}`, paciente);
  }
}
