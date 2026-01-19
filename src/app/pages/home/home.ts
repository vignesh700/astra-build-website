import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  QueryList,
  ViewChildren,
  HostListener,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router'; // Added for navigation
import { Meta, Title } from '@angular/platform-browser'; // SEO Tools

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements AfterViewInit {
  @ViewChildren('scrollFade') fadeElements!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('parallaxImg') parallaxImages!: QueryList<ElementRef<HTMLElement>>;

  private observer: IntersectionObserver | null = null;
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private meta: Meta,
    private title: Title,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    // SEO: Set Title & Meta Description from PDF [cite: 6, 14]
    this.title.setTitle('Astra Build International | Building Innovative Integration');
    this.meta.updateTag({
      name: 'description',
      content:
        'Astra Build International delivers integrated, sustainable, and future-ready construction solutions. Global excellence in Residential, Commercial, and Industrial projects.',
    });
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    // 1. Initialize Reveal Animation (Start hidden only if JS works)
    const elements = this.fadeElements.map((e) => e.nativeElement);
    elements.forEach((el) => el.classList.add('fade-init'));

    // 2. Setup Intersection Observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Also trigger mask reveal if it exists inside
            const masks = entry.target.querySelectorAll('.reveal-mask');
            masks.forEach((m) => m.classList.add('active'));

            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' },
    );

    elements.forEach((el) => this.observer?.observe(el));
  }

  // 3. Smooth Parallax Effect
  @HostListener('window:scroll', [])
  onScroll() {
    if (!this.isBrowser || !this.parallaxImages) return;
    const scrollY = window.scrollY;

    this.parallaxImages.forEach((el) => {
      const node = el.nativeElement;
      const speed = parseFloat(node.getAttribute('data-speed') || '0.05');
      // Simple translate for performance
      node.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }
}
