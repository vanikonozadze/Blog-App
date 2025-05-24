import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {LayoutHeaderComponent} from './layout-header/layout-header.component';
import {RouterOutlet} from '@angular/router';
import {LayoutFooterComponent} from './layout-footer/layout-footer.component';
import {ThemeService} from '../core/services/theme.service';
import {NgClass} from '@angular/common';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.state';
import {PostService} from '../core/services/post.service';
import {tap} from 'rxjs';
import {loadPostsSuccess} from '../store/post/post.actions';

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
  private store = inject(Store<AppState>);
  private readonly postService = inject(PostService);
  public readonly themeService = inject(ThemeService);

  constructor() {
    this.postService.getPosts$().pipe(
      tap((posts) => {
        this.store.dispatch(loadPostsSuccess({posts}))
      })
    ).subscribe();
  }
}
