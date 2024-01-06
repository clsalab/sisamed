import { Injectable,  } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { User } from './user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  [x: string]: any;

  private apiUrl = 'http://localhost:3001/api';

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.currentUserLoginOn.next(true);
      // Realizar solicitud adicional para obtener el nombre de usuario y el correo electrónico
      this.fetchUserData(token);
    }
  }

  login(credentials: LoginRequest): Observable<User> {
    const loginUrl = `${this.apiUrl}/auth/login`;

    return this.http.post<{ data: { token: string, user: User } }>(loginUrl, credentials).pipe(
      tap((response: any) => {
        const userData: User = {
          _id: response.data.user._id,
          token: response.data.token,
          username: response.data.user.username,
          useremail: response.data.user.useremail,
        };
        localStorage.setItem('userData', JSON.stringify(userData));

        console.log('Datos del usuario después del inicio de sesión:', userData);

        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);

        if (userData.token !== undefined) {
          localStorage.setItem('token', userData.token);
          // Realizar solicitud adicional para obtener el nombre de usuario y el correo electrónico
          this.fetchUserData(userData.token);
        }
      }),
      catchError(this.handleError)
    );
  }
  //
  getUserToken(): string | null {
    const userData = this.currentUserData.value;
    return userData ? userData.token : null;
  }

  // ...

  private fetchUserData(token: string): Observable<User> {
    const userUrl = `${this.apiUrl}/auth/userdata`;
  
    return this.http.get<any>(userUrl, { headers: { Authorization: `Bearer ${token}` } }).pipe(
      map((userData: any) => {
        const updatedUserData: User = {
          _id: userData._id,
          token: token,
          username: userData.username || 'Nombre no disponible',
          useremail: userData.useremail || 'Email no disponible',
        };
  
        this.currentUserData.next(updatedUserData);
        return updatedUserData;
      }),
      catchError(this.handleError)
    );
  }

// ...

  
  logout(): void {
  // Elimina el token del localStorage al cerrar sesión
    localStorage.removeItem('token');
    this.currentUserLoginOn.next(false);
    this.currentUserData.next(null);
  }
  //Se agregaron estas dos lineas
  isLoggedIn(): boolean {
    return this.currentUserLoginOn.value;
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en la solicitud:', error);
  
    if (error.status === 0) {
      console.error('Se ha producido un error de red');
    } else {
      console.error('Backend retornó el código de estado', error.status, 'con el mensaje:', error.error);
    }
    console.error('Detalles del error:', error);
  
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
  }

  
  
  
  get userData(): Observable<User | null> {
    return this.currentUserData.asObservable();
  }
  
  get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  updateUserData(updatedData: any): Observable<User> {
    const token = this.getUserToken();
  
    if (!token) {
      // Manejar el caso en el que no hay un token
      return throwError('Token de usuario no disponible');
    }
  
    // Obtén el ID del usuario actual desde el servicio
    const userId = this.currentUserData.value?._id;
  
    // Verifica si se obtuvo el ID antes de construir la URL
    if (!userId) {
      return throwError('ID de usuario no disponible');
    }
  
    // Modifica la URL para incluir el ID del usuario
    const updateUrl = `${this.apiUrl}/users/${userId}`;
  
    return this.http.put<{ data: { user: User } }>(updateUrl, updatedData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).pipe(
      tap((response: any) => {
        const updatedUser: User = {
          _id: response.data.user._id,
          token: token,
          username: response.data.user.username,
          useremail: response.data.user.useremail,
        };
  
        this.currentUserData.next(updatedUser);
      }),
      catchError(this.handleError)
    );
  }
  
  
}