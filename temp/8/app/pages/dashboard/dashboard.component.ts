import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userLoginOn: boolean = false;
  userData: Observable<User | null> = this.loginService.userData;

  private userDataSubscription?: Subscription;
  private userLoginOnSubscription?: Subscription;

  constructor(private loginService: LoginService, private router: Router) {}


  ngOnDestroy(): void {
    // Desuscribirse para evitar posibles fugas de memoria
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
    if (this.userLoginOnSubscription) {
      this.userLoginOnSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.userLoginOnSubscription = this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });

    this.userDataSubscription = this.loginService.currentUserData.subscribe({
      next: (userData) => {
        // Asigna un valor predeterminado si username y useremail no están disponibles
        this.userData = this.loginService.userData.pipe(
          map((user) => ({
            _id: user?._id || '',
            token: user?.token || '',
            username: user?.username || 'Nombre no disponible',
            useremail: user?.useremail || 'Email no disponible',
          }))
        );
      }
    });
  }
  logout(): void {
    this.loginService.logout();
    // Puedes redirigir a la página de inicio o a donde desees después de cerrar sesión
    this.router.navigateByUrl('/inicio');
  }
}



