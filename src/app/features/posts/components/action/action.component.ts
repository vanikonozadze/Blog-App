import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { Router, RouterLink } from '@angular/router';
import { selectPosts } from '../../../../store/post/post.selectors';
import { take } from 'rxjs/operators';
import { IPost } from '../../../../core/models/post.model';
import { addPost, updatePost } from '../../../../store/post/post.actions';
import { generateUniqueId, getFormErrors } from './helper/action.functions';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-action',
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './action.component.html',
  styleUrl: './action.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionComponent implements OnInit {
  @Input() actionType!: string | null;
  @Input() postData!: IPost | null;
  private readonly store = inject(Store<AppState>);
  private readonly router = inject(Router);
  private existingIds = new Set<string | number>();

  public postForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    author: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    date: new FormControl('', Validators.required),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
  });

  ngOnInit() {
    if (this.actionType === 'edit' && this.postData) {
      this.postForm.setValue({
        id: this.postData.id,
        title: this.postData.title,
        author: this.postData.author,
        date: this.postData.date,
        description: this.postData.description,
        content: this.postData.content,
      });
    }
    this.store
      .select(selectPosts)
      .pipe(take(1))
      .subscribe((posts) => {
        this.existingIds = new Set(posts.map((p) => p.id));
      });
  }

  public submitAction(): void {
    if (this.postForm.valid) {
      this.postForm.disable();

      const formValue = this.postForm.value;

      let _post: IPost;

      if (this.actionType === 'edit') {
        _post = {
          id: formValue.id as string,
          title: formValue.title as string,
          author: formValue.author as string,
          date: formValue.date as string,
          description: formValue.description as string,
          content: formValue.content as string,
        };
        this.store.dispatch(updatePost({ post: _post }));
      } else {
        _post = {
          id: generateUniqueId(this.existingIds),
          title: formValue.title as string,
          author: formValue.author as string,
          date: formValue.date as string,
          description: formValue.description as string,
          content: formValue.content as string,
        };
        this.store.dispatch(addPost({ post: _post }));
      }

      setTimeout(() => {
        this.router.navigate(['/home/posts']);
      }, 100);
    } else {
      const errors = getFormErrors(this.postForm);
      alert(`Please correct the following errors:\n\n${errors.join('\n')}`);
    }
  }
}
