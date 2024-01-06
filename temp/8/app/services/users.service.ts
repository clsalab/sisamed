import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable,throwError } from 'rxjs';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string;
  
  

  constructor(private http: HttpClient) { 
    this.baseUrl = 'http://localhost:3001/api';
  }
  getUsers(): Observable<User[]> {
    return this.http.get<{ data: User[] }>(`${this.baseUrl}/users`).pipe(
      map(response => response.data)
    );
  }

  register(userDetails: any): Observable<any> {
    const registerUrl = `${this.baseUrl}/auth/register`; 

    return this.http.post(registerUrl, userDetails).pipe(
      catchError((error: any) => {
        console.error('Error en el registro:', error);
         // Verifica si el error contiene un mensaje específico del servidor
         const errorMessage = error.error && error.error.error ? error.error.error : 'Error en el registro. Por favor, inténtelo de nuevo.';
        return throwError(errorMessage); //se cambio el mensaje  
      })
    );
  }



  updateUserData(id:string, updatedData: any): Observable<any> {
    const headers = this.getHeaders();

    // Utiliza el httpClient en lugar de http
    return this.http.put(`${this.baseUrl}/users/${id}`, updatedData, { headers });
  }
  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    return headers; 
  }

  eliminarUser(id:string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/users/${id}`, { headers});
  }

  guardarUser(user: User): Observable<any> {
    return this.http.post(this.baseUrl, user);
  }
  
  obtenerUser(id:string):Observable<any> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }
}
  
