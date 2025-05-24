import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {ThemeService} from '../../../../core/services/theme.service';
import {NgClass} from '@angular/common';
import {IPost} from '../../../../core/models/post.model';
import {RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.state';
import {PostService} from '../../../../core/services/post.service';
import {catchError, of, switchMap, tap} from 'rxjs';
import {deletePostSuccess, loadPostsSuccess} from '../../../../store/post/post.actions';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
  imports: [
    NgClass,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCardComponent {
  @Input() postData!: IPost;
  private store = inject(Store<AppState>);
  public readonly themeService = inject(ThemeService);
  private readonly postService = inject(PostService);

  public deletePost(id: number){
    this.postService.deletePost$(id).pipe(
      switchMap(() => this.postService.getPosts$()),
      tap(posts => {
        this.store.dispatch(loadPostsSuccess({ posts }))
        this.store.dispatch(deletePostSuccess({ id }))
      }),
      catchError(error => {
        console.error('Delete or reload failed', error);
        return of(null);
      })
    ).subscribe();
  }
}
