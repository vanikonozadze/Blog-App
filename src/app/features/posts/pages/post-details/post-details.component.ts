import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AsyncPipe, DatePipe, NgIf} from '@angular/common';
import {PostService} from '../../../../core/services/post.service';

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
export class PostDetailsComponent {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);

  private $postId$ = signal(Number(this.route.snapshot.paramMap.get('id')));

  public post$ = this.postService.getPost$(this.$postId$());
}
