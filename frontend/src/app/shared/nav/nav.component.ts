import { Component, OnDestroy, OnInit, HostListener, Renderer2, ElementRef } from '@angular/core';
import { LoginService } from './../../services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  userLoginOn: boolean = false;
  isNavbarFixed = false;

  constructor(private loginService: LoginService, private router: Router, private renderer: Renderer2, private el: ElementRef) {}

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isNavbarFixed = scrollPosition > 0;
  }

  ngOnDestroy(): void {
    this.loginService.currentUserLoginOn.unsubscribe();
  }

  redirectToLogin(): void {
    this.router.navigateByUrl('/login');
  }

  redirectToRegister(): void {
    this.router.navigateByUrl('/register');
  }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigateByUrl('/inicio');
  }
}
