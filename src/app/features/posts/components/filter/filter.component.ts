import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import {
  loadPosts,
  setPostFilterTitle,
  sortPostsByDate,
} from '../../../../store/post/post.actions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeService } from '../../../../core/services/theme.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-filter',
  imports: [ReactiveFormsModule, FormsModule, NgClass],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  private store = inject(Store<AppState>);
  public readonly themeService = inject(ThemeService);

  public titleFilter: string = '';

  constructor() {
    this.store.dispatch(loadPosts());
  }

  onTitleChange(title: string) {
    this.store.dispatch(setPostFilterTitle({ title }));
  }

  public sortAsc() {
    this.store.dispatch(sortPostsByDate({ direction: 'asc' }));
  }

  public sortDesc() {
    this.store.dispatch(sortPostsByDate({ direction: 'desc' }));
  }
}
