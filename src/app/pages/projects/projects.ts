import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { PROJECTS } from '../../core/services/data';
import { Seo } from '../../core/services/seo';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements AfterViewInit, OnDestroy {
  projects: any[] = PROJECTS;

  @ViewChildren('revealEl', { read: ElementRef })
  revealEls!: QueryList<ElementRef<HTMLElement>>;

  private io?: IntersectionObserver;
  private readonly isBrowser: boolean;

  constructor(
    private seo: Seo,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    this.seo.setSeo(
      'Projects | Astra Build International',
      'Our completed residential, commercial and industrial construction projects.',
    );
  }

  ngAfterViewInit(): void {
    // SSR guard
    if (!this.isBrowser) return;

    // Fallback for browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      this.revealEls.forEach((el) => el.nativeElement.classList.add('is-in'));
      return;
    }

    this.io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            this.io?.unobserve(entry.target); // animate once
          }
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    this.revealEls.forEach((el) => this.io!.observe(el.nativeElement));
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }
}
