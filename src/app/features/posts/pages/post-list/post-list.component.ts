import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {PostCardComponent} from '../../components/post-card/post-card.component';
import {AsyncPipe, NgIf} from '@angular/common';
import {Store} from '@ngrx/store';
import {selectPosts} from '../../../../store/post/post.selectors';
import {AppState} from '../../../../store/app.state';
import {loadPosts, loadPostsSuccess} from '../../../../store/post/post.actions';
import {Observable} from 'rxjs';
import {IPost} from '../../../../core/models/post.model';
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
export class PostListComponent implements OnInit {
  private store = inject(Store<AppState>);
  public posts$!: Observable<IPost[]>;

  ngOnInit(){
    this.getAllPosts();
  }

  private getAllPosts(): void{
    this.store.dispatch(loadPosts());
    this.posts$ = this.store.select(selectPosts)
  }
}
