import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-conocenos',
  templateUrl: './conocenos.component.html',
  styleUrls: ['./conocenos.component.css']
})
export class ConocenosComponent implements AfterViewInit {

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

  constructor(private renderer: Renderer2) { }

}