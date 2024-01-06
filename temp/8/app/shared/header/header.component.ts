import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private lastScrollTop = 0;
  private readonly scrollDelta = 5;
  public isAtTop = true;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    const st = window.pageYOffset || document.documentElement.scrollTop;

    if (Math.abs(this.lastScrollTop - st) <= this.scrollDelta) {
      return;
    }

    if (st > this.lastScrollTop && st > 50) {
      // Scrolling down, hide the header
      this.hideHeader();
    } else {
      // Scrolling up or near the top, show the header
      this.showHeader();
    }
    this.isAtTop = st < 50;

    this.lastScrollTop = st;
  }

  private hideHeader(): void {
    // Lógica para ocultar el header
  }

  private showHeader(): void {
    // Lógica para mostrar el header
  }
}
