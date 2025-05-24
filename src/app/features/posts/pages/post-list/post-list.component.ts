import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { AsyncPipe, NgIf, NgForOf } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectPosts } from '../../../../store/post/post.selectors';
import { AppState } from '../../../../store/app.state';
import { loadPosts } from '../../../../store/post/post.actions';
import { combineLatest, map, tap } from 'rxjs';
import { PaginationService } from '../../../../core/services/pagination.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostCardComponent, NgIf, AsyncPipe, NgForOf],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent {
  private store = inject(Store<AppState>);
  private paginationService = inject(PaginationService);

  constructor() {
    this.store.dispatch(loadPosts());
  }

  posts$ = this.store
    .select(selectPosts)
    .pipe(tap((posts) => this.paginationService.setTotalItems(posts.length)));

  paginatedPosts$ = combineLatest([
    this.posts$,
    this.paginationService.currentPage$,
  ]).pipe(
    map(([posts, currentPage]) =>
      this.paginationService.getPageSlice(posts, currentPage),
    ),
  );

  public currentPage$ = this.paginationService.currentPage$;

  public totalPages$ = this.paginationService.totalPages$;

  public nextPage() {
    this.paginationService.nextPage();
  }

  public prevPage() {
    this.paginationService.prevPage();
  }
}
