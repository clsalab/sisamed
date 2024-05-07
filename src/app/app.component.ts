// src/app/app.component.ts
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  public isLoggedIn: boolean = false;

  public toggleLogin(): void {
    this.isLoggedIn = !this.isLoggedIn;
  }
}
