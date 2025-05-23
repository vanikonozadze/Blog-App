import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ThemeService} from '../../core/services/theme.service';

@Component({
  selector: 'app-layout-header',
  imports: [],
  templateUrl: './layout-header.component.html',
  styleUrl: './layout-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutHeaderComponent {
  public readonly themeService = inject(ThemeService);

  public toggleTheme() {
    this.themeService.updateTheme();
  }
}
