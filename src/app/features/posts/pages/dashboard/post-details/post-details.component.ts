import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/app.state';
import { selectP } from '../../../../../store/post/post.actions';
import { selectPostById } from '../../../../../store/post/post.selectors';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
  imports: [NgIf, AsyncPipe, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailsComponent implements OnInit {
  private store = inject(Store<AppState>);
  private route = inject(ActivatedRoute);

  private $postId$ = signal(this.route.snapshot.paramMap.get('id'));

  public post$ = this.store.select(selectPostById(this.$postId$()));

  ngOnInit(): void {
    this.getSelectedPost();
  }

  private getSelectedPost() {
    const id = this.$postId$();
    this.store.dispatch(selectP({ id }));
  }
}
