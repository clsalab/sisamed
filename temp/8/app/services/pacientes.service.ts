// pacientes.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3001/api/pacientes'; // Cambia la URL según tu backend
  }

  registrarPaciente(pacienteData: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/registrar`, pacienteData);
  }
 
   // Agrega más métodos según tus necesidades (obtener pacientes, actualizar, eliminar, etc.)
}

 

