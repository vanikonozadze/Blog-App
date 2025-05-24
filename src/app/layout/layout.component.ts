import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {LayoutHeaderComponent} from './layout-header/layout-header.component';
import {RouterOutlet} from '@angular/router';
import {LayoutFooterComponent} from './layout-footer/layout-footer.component';
import {ThemeService} from '../core/services/theme.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [
    LayoutHeaderComponent,
    RouterOutlet,
    LayoutFooterComponent,
    NgClass
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  public readonly themeService = inject(ThemeService);
}
