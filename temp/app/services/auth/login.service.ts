import { Injectable,  } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

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

  // ...

private fetchUserData(token: string): void {
  const userUrl = `${this.apiUrl}/auth/userdata`;

  this.http.get<any>(userUrl, { headers: { Authorization: `Bearer ${token}` } }).subscribe(
    (userData: any) => {
      console.log('Datos del usuario obtenidos correctamente:', userData);

      const updatedUserData: User = {
        _id: userData._id,
        token: token,
        username: userData.username || 'Nombre no disponible', // Valor predeterminado si no existe
        useremail: userData.useremail || 'Email no disponible', // Valor predeterminado si no existe
      };

      this.currentUserData.next(updatedUserData);
    },
    (error) => {
      console.error('Error al obtener datos adicionales del usuario:', error);
    }
  );
}

// ...

  
  
  
  logout(): void {
    // Elimina el token del localStorage al cerrar sesión
    localStorage.removeItem('token');
    this.currentUserLoginOn.next(false);
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
  
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
  }

  
  
  
  get userData(): Observable<User | null> {
    return this.currentUserData.asObservable();
  }
  
  get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }
}
