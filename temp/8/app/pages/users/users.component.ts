// users.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user'; 
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  userLoginOn: boolean = false;
  userData: User | null = null;
  userForm: FormGroup;

  private userDataSubscription?: Subscription;
  private userLoginOnSubscription?: Subscription;

  constructor(private loginService: LoginService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: [''],
      useremail: [''],
    });
  }

  ngOnInit(): void {
    this.userLoginOnSubscription = this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });

    this.userDataSubscription = this.loginService.currentUserData.subscribe({
      next: (userData) => {
        this.userData = userData;
        this.updateFormValues();
      }
    });
  }

  updateFormValues(): void {
    // Actualiza los valores del formulario con los datos del usuario
    if (this.userData) {
      this.userForm.patchValue({
        username: this.userData.username,
        useremail: this.userData.useremail,
      });
    }
  }

  updateUserData(): void {
    const updatedData = this.userForm.value;
    this.loginService.updateUserData(updatedData).subscribe({
      next: () => {
        // Realizar acciones adicionales después de la actualización
        console.log('Datos del usuario actualizados con éxito');
      },
      error: (err) => {
        // Manejar errores de actualización
        console.error('Error al actualizar datos del usuario:', err);
      },
    });
  }

  ngOnDestroy(): void {
    // Desuscribirse para evitar posibles fugas de memoria
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
    if (this.userLoginOnSubscription) {
      this.userLoginOnSubscription.unsubscribe();
    }
  }
}

