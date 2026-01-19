import { Component } from '@angular/core';
import { PROJECTS } from '../../core/services/data';
import { Seo } from '../../core/services/seo';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  projects: any[] = PROJECTS;

  constructor(private seo: Seo) {
    this.seo.setSeo(
      'Projects | Astra Build International',
      'Our completed residential, commercial and industrial construction projects.',
    );
  }
}
