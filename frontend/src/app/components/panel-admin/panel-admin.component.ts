import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SplitterModule } from 'primeng/splitter';


@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls:[ './panel-admin.component.css']
})
export class PanelAdminComponent {
  private _opcionSeleccionada: number = 0;
  loading: boolean = false;

  get opcionSeleccionada(): number {
    return this._opcionSeleccionada;
  }
  // Define la propiedad 'items'
  items: any[] = [
    {
      label: 'Citas',
      icon: 'pi pi-calendar', // Clase de icono de PrimeNG
      items: [
        { label: 'Nuevo', icon: 'pi pi-calendar-plus', command: () => this.seleccionarOpcion(1) },
        { label: 'Listar Citas', icon: 'pi pi-book', command: () => this.seleccionarOpcion(2) },
        { label: 'Recuperar', icon: 'pi pi-refresh', command: () => this.seleccionarOpcion(3) },
      ]
    },
    {
      label: 'Pacientes',
      icon: 'pi pi-users', // Clase de icono de PrimeNG
      items: [
        { label: 'Nuevo', icon: 'pi pi-user-plus', command: () => this.seleccionarOpcion(4) },
        { label: 'Pacientes', icon: 'pi pi-users', command: () => this.seleccionarOpcion(5) },
        { label: 'Recuperar', icon: 'pi pi-refresh', command: () => this.seleccionarOpcion(6) },
      ]
    },
    {
      label: 'Medicos',
      icon: 'pi pi-id-card', // Clase de icono de PrimeNG
      items: [
        { label: 'Nuevo', icon: 'pi pi-plus', command: () => this.seleccionarOpcion(7) },
        { label: 'Medicos', icon: 'pi pi-briefcase', command: () => this.seleccionarOpcion(8) },
        { label: 'Recuperar', icon: 'pi pi-refresh', command: () => this.seleccionarOpcion(9) },
      ]
    },
    
    {
      label: 'Consultorios',
      icon: 'pi pi-building', // Clase de icono de PrimeNG
      items: [
        { label: 'Nuevo', icon: 'pi pi-plus', command: () => this.seleccionarOpcion(10) },
        { label: 'Consultorios', icon: 'pi pi-home', command: () => this.seleccionarOpcion(11) },
        { label: 'Recuperar', icon: 'pi pi-refresh', command: () => this.seleccionarOpcion(12) },
      ]
    },
    // ... otras opciones
    {
      label: 'Usuarios',
      icon: 'pi pi-building', // Clase de icono de PrimeNG
      items: [
        { label: 'Nuevo', icon: 'pi pi-user-plus', command: () => this.seleccionarOpcion(13) },
        { label: 'Consultorios', icon: 'pi pi-users', command: () => this.seleccionarOpcion(14) },
        { label: 'Recuperar', icon: 'pi pi-refresh', command: () => this.seleccionarOpcion(15) },
      ]
    },
  ];
  


  


  constructor(
    private splitterModule: SplitterModule,
    private router: Router,
    private route: ActivatedRoute
      ) {}

  ngOnInit() {
    
  }

  private seleccionarOpcion(opcion: number): void {
    console.log(`Opción seleccionada: ${opcion}`);
    this.loading = true; 
    this._opcionSeleccionada = opcion;

    const navigationExtras: NavigationExtras = {
      relativeTo: this.route, // Indica que la navegación es relativa a la ruta actual
    };

    switch (opcion) {
       // Lógica para la Citas: 1 Nuevo, 2 Listar, 3 Recuperar
      case 1:       
        this.router.navigate(['register-cita'], { relativeTo: this.route });
        break;

      case 2:       
        this.router.navigate(['items-citas'], { relativeTo: this.route });
        break;

      case 3:        
        this.router.navigate(['restaurar-cita'], { relativeTo: this.route });
        break;

        // Lógica para Pacientes: 4 Nuevo, 5 Listar, 6 Recuperar
        case 4:
        this.router.navigate(['register-paciente'], { relativeTo: this.route });
        break;

        case 5:
        this.router.navigate(['items-pacientes'], { relativeTo: this.route });
        break;

        case 6:
        this.router.navigate(['restaurar-paciente'], { relativeTo: this.route });
        break;

        // Lógica para la Médicos: 7 Nuevo, 8 Listar, 9 Recuperar
        case 7:
        this.router.navigate(['register-medico'], { relativeTo: this.route });
        break;

        case 8:
        this.router.navigate(['items-medicos'], { relativeTo: this.route });
        break;

        case 9:
        this.router.navigate(['restaurar-medico'], { relativeTo: this.route });
        break;

        // Lógica para la Consultorio: 10 Nuevo, 11 Listar, 12 Recuperar
        case 10:
        this.router.navigate(['register-consult'], { relativeTo: this.route });
        break;

        case 11:
        this.router.navigate(['items-consults'], { relativeTo: this.route });
        break;

        case 12:
        this.router.navigate(['restaurar-consult'], { relativeTo: this.route });
        break;

         // Lógica para Usuarios: 13 Nuevo, 14 Listar, 15 Recuperar
        case 13:
        this.router.navigate(['register-user'], { relativeTo: this.route });
        break;

        case 14:
        this.router.navigate(['items-users'], { relativeTo: this.route });
        break;

        case 15:
        this.router.navigate(['restaurar-user'], { relativeTo: this.route });
        break;
      default:
        break;
    }
  }
  onNavigationComplete(): void {
    this.loading = false; // Desactiva el loading cuando la navegación está completa
  }
}
