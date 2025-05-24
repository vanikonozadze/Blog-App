import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { PaginationService } from '../../../../core/services/pagination.service';
import {
  loadPosts,
  setPostFilterDate,
  setPostFilterTitle,
} from '../../../../store/post/post.actions';
import { selectFilteredPosts } from '../../../../store/post/post.selectors';
import { tap } from 'rxjs';
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
  public dateFilter: string = '';

  constructor() {
    this.store.dispatch(loadPosts());
  }

  onTitleChange(title: string) {
    this.store.dispatch(setPostFilterTitle({ title }));
  }

  onDateChange(date: string) {
    this.store.dispatch(setPostFilterDate({ date }));
  }
}
