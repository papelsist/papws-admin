import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DisplayModeService {
  dark: boolean;
  isDark$ = new Subject<boolean>();
  constructor() {
    this.registerMediaListener();
  }

  startDarkMode() {
    this.dark =
      (localStorage.getItem('papelx.admin.dark-mode') || 'true') === 'true';
    this.toggleDarkMode(this.dark);
  }

  registerMediaListener() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addEventListener('change', (mediaQuery) => {
      this.dark = mediaQuery.matches;
      this.toggleDarkMode(this.dark);
    });
  }

  toggleDarkMode(isDark: boolean) {
    this.dark = isDark;
    document.body.classList.toggle('dark', this.dark);
    localStorage.setItem('papelx.admin.dark-mode', this.dark.toString());
  }
}
