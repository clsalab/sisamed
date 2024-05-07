import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable,throwError } from 'rxjs';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';
import { ConstantUri } from '../utils/contantUri';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  
  

  constructor(private http: HttpClient) { 
    
  }
  getUsers(): Observable<User[]> {
      return this.http.get<{ data: User[] }>(`${ConstantUri.usersUrl}`).pipe(
      map(response => response.data)
    );
  }

  register(userDetails: any): Observable<any> {
    const registerUrl = `${ConstantUri.registerUserUrl}`; 

    return this.http.post(registerUrl, userDetails).pipe(
      catchError((error: any) => {
        console.error('Error en el registro:', error);
         // Verifica si el error contiene un mensaje específico del servidor
         const errorMessage = error.error && error.error.error ? error.error.error : 'Error en el registro. Por favor, inténtelo de nuevo.';
        return throwError(errorMessage); //se cambio el mensaje  
      })
    );
  }



  updateUserData(id: string, updatedData: any): Observable<any> {
    const headers = this.getHeaders();
  
    return this.http.put(`${ConstantUri.usersUrl}/${id}`, updatedData, { headers }).pipe(
      catchError((error: any) => {
        console.error('Error al actualizar el usuario:', error);
        console.log('Objeto de error en el servicio:', error);
  
        // Verifica si el error es de duplicidad y lanza un nuevo error con la clave 'DUPLICATE_USER'
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

  eliminarUser(id:string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${ConstantUri.usersUrl}/${id}`, { headers});
  }

  guardarUser(user: User): Observable<any> {
    return this.http.post(ConstantUri.baseUrl, user);
  }
  
  obtenerUser(id:string):Observable<any> {
    return this.http.get<User>(`${ConstantUri.usersUrl}/${id}`);
  }
}
  
