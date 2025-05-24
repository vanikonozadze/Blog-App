import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-layout-header',
  imports: [RouterLink, NgClass, MatSlideToggle],
  templateUrl: './layout-header.component.html',
  styleUrl: './layout-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutHeaderComponent {
  public readonly themeService = inject(ThemeService);

  public toggleTheme() {
    this.themeService.updateTheme();
  }
}
