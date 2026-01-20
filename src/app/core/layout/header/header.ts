import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  imports: [MenubarModule, RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isMenuOpen = false;
  private phone = '+917204028742';
  private whatsappNumber = '917204028742'; // countrycode+number, no +

  get callHref(): string {
    return `tel:${this.phone}`;
  }

  get whatsAppHref(): string {
    return `https://wa.me/${this.whatsappNumber}`;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  openMenu(): void {
    this.isMenuOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.isMenuOpen) this.closeMenu();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }
  menu = [
    { label: 'Home', routerLink: '/' },
    { label: 'About Us', routerLink: '/about-us' },
    { label: 'Services', routerLink: '/services' },
    { label: 'Contact', routerLink: '/contact' },
  ];
}
