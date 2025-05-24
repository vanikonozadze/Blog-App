import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { PaginationService } from '../../../../core/services/pagination.service';
import { loadPosts } from '../../../../store/post/post.actions';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [AsyncPipe, NgIf],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  private store = inject(Store<AppState>);
  private paginationService = inject(PaginationService);
  constructor() {
    this.store.dispatch(loadPosts());
  }

  public currentPage$ = this.paginationService.currentPage$;

  public totalPages$ = this.paginationService.totalPages$;

  public nextPage() {
    this.paginationService.nextPage();
  }

  public prevPage() {
    this.paginationService.prevPage();
  }
}
