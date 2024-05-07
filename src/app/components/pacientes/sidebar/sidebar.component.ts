import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  items = [
    {
      label: 'Inicio',
      icon: 'pi pi-home', // Clase de icono de PrimeNG
      items: [
        { label: 'Subitem 1', icon: 'pi pi-arrow-right' },
        { label: 'Subitem 2', icon: 'pi pi-arrow-left' }
      ]
    },
    // Otros elementos del menú
  ];
}
