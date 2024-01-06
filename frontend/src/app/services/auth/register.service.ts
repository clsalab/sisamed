import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:3001/api'; // Reemplaza con tu URL de la API

  constructor(private http: HttpClient) {}

  register(userDetails: any): Observable<any> {
    const registerUrl = `${this.apiUrl}/auth/register`;

    return this.http.post(registerUrl, userDetails).pipe(
      catchError((error: any) => {
        console.error('Error en el registro:', error);

        // Verifica si el error contiene un mensaje específico del servidor
        const errorMessage = error.error && error.error.error ? error.error.error : 'Error en el registro. Por favor, inténtelo de nuevo.';
        return throwError(errorMessage);
      })
    );
  }
}
