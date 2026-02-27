import {
  AfterViewInit,
  OnDestroy,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Seo } from '../../core/services/seo';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.scss'],
})
export class About implements AfterViewInit, OnDestroy {
  @ViewChildren('reveal', { read: ElementRef })
  revealEls!: QueryList<ElementRef<HTMLElement>>;
  private io?: IntersectionObserver;

  constructor(
    private seo: Seo,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.seo.setSeo(
      'About Us | Astra Build International',
      'Astra Build International Pvt Ltd is a Bangalore-based design, build and integration company delivering premium residential interiors and structured construction solutions.'
    );
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // If for some reason we have no elements, don't block the UI.
    if (!this.revealEls || this.revealEls.length === 0) return;

    const prefersReduced =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

    // First: mark elements as "ready to animate" (this is what hides them)
    // IMPORTANT: We hide ONLY after JS is running, so no blank page.
    this.revealEls.forEach((el) => el.nativeElement.classList.add('reveal-init'));

    if (prefersReduced) {
      this.revealEls.forEach((el) => el.nativeElement.classList.add('is-in'));
      return;
    }

    this.io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('is-in');
            this.io?.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    this.revealEls.forEach((el) => this.io?.observe(el.nativeElement));
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }
}
