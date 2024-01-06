import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userLoginOn: boolean = false;
  userData: User | null = null;

  private userDataSubscription?: Subscription;
  private userLoginOnSubscription?: Subscription;

  constructor(private loginService: LoginService) {}

  ngOnDestroy(): void {
    // Desuscribirse para evitar posibles fugas de memoria
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
    if (this.userLoginOnSubscription) {
      this.userLoginOnSubscription.unsubscribe();
    }
  }
  

 // ...

 ngOnInit(): void {
  this.userLoginOnSubscription = this.loginService.currentUserLoginOn.subscribe({
    next: (userLoginOn) => {
      this.userLoginOn = userLoginOn;
    }
  });

  this.userDataSubscription = this.loginService.currentUserData.subscribe({
    next: (userData) => {
      // Asigna un valor predeterminado si username y useremail no están disponibles
      this.userData = {
        _id: userData?._id || '',
        token: userData?.token || '',
        username: userData?.username || 'Nombre no disponible',
        useremail: userData?.useremail || 'Email no disponible',
        };
      }
    
  });
}
}

