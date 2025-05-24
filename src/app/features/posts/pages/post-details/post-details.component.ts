import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AsyncPipe, DatePipe, NgIf} from '@angular/common';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.state';
import {selectP} from '../../../../store/post/post.actions';
import {Observable, tap} from 'rxjs';
import {IPost} from '../../../../core/models/post.model';
import {selectPost, selectPostById} from '../../../../store/post/post.selectors';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
  imports: [
    NgIf,
    AsyncPipe,
    DatePipe

  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostDetailsComponent implements OnInit {
  private store = inject(Store<AppState>);
  private route = inject(ActivatedRoute);

  public post$!: Observable<IPost | undefined>

  private $postId$ = signal(Number(this.route.snapshot.paramMap.get('id')));

  ngOnInit(): void {
    const id = this.$postId$();
    this.store.dispatch(selectP({ id }));
    this.post$ = this.store.select(selectPost).pipe(
      switchMap(post => {
        return post;
      })
    );
  }
}
