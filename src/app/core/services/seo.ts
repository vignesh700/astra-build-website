import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class Seo {
  constructor(private meta: Meta, private title: Title) {}

  setSeo(title: string, description: string) {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
  }
}
