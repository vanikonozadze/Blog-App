import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgIf, NgForOf } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectFilteredPosts } from '../../../../../store/post/post.selectors';
import { AppState } from '../../../../../store/app.state';
import { loadPosts } from '../../../../../store/post/post.actions';
import { combineLatest, map, tap } from 'rxjs';
import { PaginationService } from '../../../../../core/services/pagination.service';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../../components/card/card.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [NgIf, AsyncPipe, NgForOf, FormsModule, CardComponent],
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
    .select(selectFilteredPosts)
    .pipe(tap((posts) => this.paginationService.setTotalItems(posts.length)));

  paginatedPosts$ = combineLatest([
    this.posts$,
    this.paginationService.currentPage$,
  ]).pipe(
    map(([posts, currentPage]) =>
      this.paginationService.getPageSlice(posts, currentPage),
    ),
  );
}
