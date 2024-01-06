import { Component } from '@angular/core';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrl: './contactos.component.css'
})
export class ContactosComponent {
  
  name: string = '';
  email: string = ''; // Añade esta línea
  message: string = ''; // Añade esta línea
  onSubmit(value:any){
    console.log('Save: ', value);
  }

}
