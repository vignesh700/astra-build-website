import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isMenuOpen = false;

  private readonly isBrowser: boolean;

  private phone = '+917204028742';
  private whatsappNumber = '917204028742';

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private doc: Document,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get callHref(): string {
    return `tel:${this.phone}`;
  }

  get whatsAppHref(): string {
    return `https://wa.me/${this.whatsappNumber}`;
  }

  toggleMenu() {
    this.isMenuOpen ? this.closeMenu() : this.openMenu();
  }

  openMenu(): void {
    this.isMenuOpen = true;
    if (this.isBrowser) this.doc.body.style.overflow = 'hidden';
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    if (this.isBrowser) this.doc.body.style.overflow = '';
  }

  // ✅ Guard because SSR will also construct/destroy components
  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (!this.isBrowser) return;
    if (this.isMenuOpen) this.closeMenu();
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;
    this.doc.body.style.overflow = '';
  }

  menu = [
    { label: 'Home', routerLink: '/' },
    { label: 'About Us', routerLink: '/about-us' },
    { label: 'Services', routerLink: '/services' },
    { label: 'Contact', routerLink: '/contact' },
  ];
}
