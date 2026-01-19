import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  menu = [
    { label: 'Home', routerLink: '/' },
    { label: 'About Us', routerLink: '/about-us' },
    { label: 'Services', routerLink: '/services' },
    { label: 'Contact', routerLink: '/contact' },
  ];
}
