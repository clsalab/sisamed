import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.css'
})
export class ProfileUpdateComponent {
  user = {
    name: '',
    address: '',
    profilePicture: null // Variable para almacenar la foto
  };
  updateProfile() {
    // Lógica para enviar la actualización del perfil al servicio web
    // Puedes usar un servicio para manejar la lógica de actualización
  }

  onFileSelected(event: any) {
    // Manejar la carga de la foto
    const file = event.target.files[0];
    // Puedes procesar el archivo aquí y asignarlo a user.profilePicture
  }

}
