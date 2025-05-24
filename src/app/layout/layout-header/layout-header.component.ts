import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ThemeService} from '../../core/services/theme.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-layout-header',
  imports: [RouterLink],
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
