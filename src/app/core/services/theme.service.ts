import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public $themeSignal$ = signal<string>('dark');

  public setTheme(theme: string) {
    this.$themeSignal$.set(theme);
  }

  public updateTheme() {
    this.$themeSignal$.update((value) => (value === 'dark' ? 'light' : 'dark'));
  }
}
