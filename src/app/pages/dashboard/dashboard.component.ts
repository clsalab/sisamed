import {  AfterViewInit,Component, OnDestroy, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
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
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('cardContainer') cardContainer!: ElementRef;



  ngAfterViewInit() {
    const cards = this.cardContainer.nativeElement.querySelectorAll('.card-body');

    cards.forEach((card: HTMLElement) => {
      this.renderer.listen(card, 'mousemove', (event: MouseEvent) => {
        let cardInnerHeight = card.clientHeight;
        let cardInnerWidth = card.clientWidth;

        let rect = card.getBoundingClientRect();
        let cardXposition = event.clientX - rect.left;
        let cardYposition = event.clientY - rect.top;

        let rotateSpeed = 25;
        let xCustom = 2.5;
        let yCustom = 1.25;

        let x = (cardInnerHeight / xCustom - cardXposition) / rotateSpeed;
        let y = (cardInnerWidth / yCustom - cardYposition) / rotateSpeed;

        card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
      });

      const cardFigure = card.querySelector('.card-figure') as HTMLElement;
      const cardName = card.querySelector('.card-name') as HTMLElement;
      const cardDescription = card.querySelector('.card-description') as HTMLElement;
      const cardMedia = card.querySelector('.card-media') as HTMLElement;

      card.addEventListener('mouseover', () => {
        cardFigure.style.transform = 'translate3d(0, 0, 80px)';
        cardName.style.transform = 'translate3d(0, 0, 50px)';
        cardDescription.style.transform = 'translate3d(0, 0, 50px)';
        cardMedia.style.transform = 'translate3d(0, 0, 60px)';
        card.style.transition = 'none';
      });

      card.addEventListener('mouseout', () => {
        cardFigure.style.transform = 'translate3d(0, 0, 0)';
        cardName.style.transform = 'translate3d(0, 0, 0)';
        cardDescription.style.transform = 'translate3d(0, 0, 0)';
        cardMedia.style.transform = 'translate3d(0, 0, 0)';
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
        card.style.transition = 'transform 0.5s ease'; // Corregí el error de transfor a transform
      });
    });
  }

  userLoginOn: boolean = false;
  userData: Observable<User | null> = this.loginService.userData;
  loading: Boolean = true;
  private userDataSubscription?: Subscription;
  private userLoginOnSubscription?: Subscription;

  constructor(private loginService: LoginService, private router: Router, private renderer: Renderer2) {}


  ngOnDestroy(): void {
    
    // Desuscribirse para evitar posibles fugas de memoria
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
      this.loading = false;
      
    }
    
    if (this.userLoginOnSubscription) {
      this.userLoginOnSubscription.unsubscribe();
      this.loading = false;
      
    }
  }

  ngOnInit(): void { 
    this.userLoginOnSubscription = this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => { 
        this.userLoginOn = userLoginOn;
        this.loading = false;
        
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
        ); this.loading = false;
      }
    });
  }
  
  
  logout(): void {
    this.loading = true;
    this.loginService.logout();
    // Puedes redirigir a la página de inicio o a donde desees después de cerrar sesión
    this.router.navigateByUrl('/inicio');
    this.loading = false;
    
    

  }
}



