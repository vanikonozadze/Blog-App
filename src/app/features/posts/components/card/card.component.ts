import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { IPost } from '../../../../core/models/post.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { ThemeService } from '../../../../core/services/theme.service';
import { deletePost } from '../../../../store/post/post.actions';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [DatePipe, NgClass, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() postData!: IPost;
  private store = inject(Store<AppState>);
  public readonly themeService = inject(ThemeService);

  public deletePost(id: string) {
    this.store.dispatch(deletePost({ id: id }));
  }
}
