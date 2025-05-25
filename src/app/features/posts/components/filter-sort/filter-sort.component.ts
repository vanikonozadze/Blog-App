import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { ThemeService } from '../../../../core/services/theme.service';
import {
  loadPosts,
  setPostFilterTitle,
  sortPostsByDate,
} from '../../../../store/post/post.actions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-filter-sort',
  imports: [ReactiveFormsModule, FormsModule, NgClass],
  templateUrl: './filter-sort.component.html',
  styleUrl: './filter-sort.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterSortComponent {
  private store = inject(Store<AppState>);
  public readonly themeService = inject(ThemeService);

  public titleFilter: string = '';

  constructor() {
    this.store.dispatch(loadPosts());
  }

  public onTitleChange(title: string) {
    this.store.dispatch(setPostFilterTitle({ title }));
  }

  public sortAsc() {
    this.store.dispatch(sortPostsByDate({ direction: 'asc' }));
  }

  public sortDesc() {
    this.store.dispatch(sortPostsByDate({ direction: 'desc' }));
  }
}
