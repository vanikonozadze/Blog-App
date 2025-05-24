import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { ThemeService } from '../../../../core/services/theme.service';
import { NgClass } from '@angular/common';
import { IPost } from '../../../../core/models/post.model';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { deletePost } from '../../../../store/post/post.actions';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
  imports: [NgClass, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardComponent {
  @Input() postData!: IPost;
  private store = inject(Store<AppState>);
  public readonly themeService = inject(ThemeService);

  public deletePost(id: string) {
    this.store.dispatch(deletePost({ id: id }));
  }
}
