import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Seo } from '../../core/services/seo';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
})
export class Contact implements AfterViewInit {
  @ViewChildren('scrollFade', { read: ElementRef }) fadeElements!: QueryList<ElementRef>;

  constructor(
    private seo: Seo,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.seo.setSeo(
      'Contact Astra Build | Global Construction Services',
      'Get in touch with Astra Build International for quotes on residential, commercial, and industrial construction projects.',
    );
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const elements = this.fadeElements.map((e) => e.nativeElement);
    elements.forEach((el) => el.classList.add('fade-init'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    elements.forEach((el) => observer.observe(el));
  }
}
