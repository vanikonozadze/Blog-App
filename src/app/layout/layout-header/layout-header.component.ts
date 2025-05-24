import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-layout-header',
  imports: [RouterLink, NgClass, MatSlideToggle],
  templateUrl: './layout-header.component.html',
  styleUrl: './layout-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutHeaderComponent {
  public readonly themeService = inject(ThemeService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/starter']);
  }

  public toggleTheme() {
    this.themeService.updateTheme();
  }
}
