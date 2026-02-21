import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Seo } from '../../core/services/seo';
import { CardModule } from 'primeng/card';
import { Meta, Title } from '@angular/platform-browser'; // SEO Tools

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './services.html',
  styleUrls: ['./services.scss'],
})
export class Services implements AfterViewInit {
  // Reuse the same logic for scroll animations
  @ViewChildren('scrollFade') fadeElements!: QueryList<ElementRef<HTMLElement>>;

  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private meta: Meta,
    private title: Title,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    // SEO: Specific to Services Page
    this.title.setTitle('Construction Services | Astra Build International');
    this.meta.updateTag({
      name: 'description',
      content:
        'Expert construction services including Residential, Commercial, Interiors, Manufacturing Plant Setup, and specialized infrastructure projects.',
    });
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    // Initialize Animations
    const elements = this.fadeElements.map((e) => e.nativeElement);
    elements.forEach((el) => el.classList.add('fade-init'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Trigger internal mask reveals
            const masks = entry.target.querySelectorAll('.reveal-mask');
            masks.forEach((m) => m.classList.add('active'));

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -10% 0px' },
    );

    elements.forEach((el) => observer.observe(el));
  }
}
