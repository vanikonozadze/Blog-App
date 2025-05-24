import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {PostCardComponent} from '../../components/post-card/post-card.component';
import {AsyncPipe, NgIf} from '@angular/common';
import {Store} from '@ngrx/store';
import {selectPosts} from '../../../../store/post/post.selectors';
import {AppState} from '../../../../store/app.state';
@Component({
  selector: 'app-post-list',
  imports: [
    PostCardComponent,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostListComponent  {
  private store = inject(Store<AppState>);
  public posts$ = this.store.select(selectPosts);
}
