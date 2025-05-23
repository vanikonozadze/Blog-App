import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {PostCardComponent} from '../../components/post-card/post-card.component';
import {NgForOf} from '@angular/common';
@Component({
  selector: 'app-post-list',
  imports: [
    PostCardComponent,
    NgForOf,
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostListComponent {
}
