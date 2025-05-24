import {Component, inject, OnInit, signal} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { IPost } from '../../../../core/models/post.model';
import {loadPostsSuccess, updatePost} from '../../../../store/post/post.actions';
import {catchError, of, switchMap, tap} from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {PostService} from '../../../../core/services/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink,
    CommonModule
  ],
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  postId!: number;
  public $post$ = signal<IPost>(
    {
      author: '',
      content: '',
      date: '',
      description: '',
      id: 0,
      title: ''
    }
  )

  private postService = inject(PostService);
  private route = inject(ActivatedRoute);
  private store = inject(Store<AppState>);
  private router = inject(Router);

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPost$(this.postId).subscribe(post => {
      this.$post$.set(post)
    });
  }

  onSubmit() {
    if (!this.$post$().title || !this.$post$().author || !this.$post$().date || !this.$post$().content) return;

    const updatedPost: IPost = {
      ...this.$post$(),
      id: this.postId,
      date: new Date(this.$post$().date).toISOString(),
    };

    this.store.dispatch(updatePost({ post: updatedPost }))
    this.router.navigate(['/home/posts']);
  }
}
