import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: 'aura', // Astra PDF uses a light theme [cite: 1, 4]
        options: {
          darkModeSelector: '.my-app-dark', // Astra PDF uses a light theme [cite: 1, 4]
        },
      },
    }), provideClientHydration(withEventReplay()),
  ],
};
