import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IPost } from '../../../../../core/models/post.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/app.state';
import { addPost, loadPosts } from '../../../../../store/post/post.actions';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { selectPosts } from '../../../../../store/post/post.selectors';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-post-add',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './post-add.component.html',
  styleUrl: './post-add.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostAddComponent {
  private store = inject(Store<AppState>);
  private router = inject(Router);
  existingIds = new Set<string | number>();

  public postForm = new FormGroup({
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
    this.store
      .select(selectPosts)
      .pipe(take(1))
      .subscribe((posts) => {
        this.existingIds = new Set(posts.map((p) => p.id));
      });
  }

  public AddPost(): void {
    if (this.postForm.valid) {
      this.postForm.disable();

      const _post: IPost = {
        id: this.generateUniqueId(this.existingIds),
        title: this.postForm.value.title as string,
        author: this.postForm.value.author as string,
        date: this.postForm.value.date as string,
        description: this.postForm.value.description as string,
        content: this.postForm.value.content as string,
      };
      this.store.dispatch(addPost({ post: _post }));
      setTimeout(() => {
        this.router.navigate(['/home/posts']);
      }, 100);
    } else {
      const errors = this.getFormErrors();
      alert(`Please correct the following errors:\n\n${errors.join('\n')}`);
    }
  }

  private getFormErrors(): string[] {
    const errors: string[] = [];
    const controls = this.postForm.controls;

    if (controls.title?.errors) {
      if (controls.title.errors['required']) errors.push('Title is required.');
      if (controls.title.errors['minlength'])
        errors.push('Title must be at least 3 characters.');
      if (controls.title.errors['maxlength'])
        errors.push('Title must be less than 100 characters.');
    }

    if (controls.author?.errors) {
      if (controls.author.errors['required'])
        errors.push('Author is required.');
      if (controls.author.errors['minlength'])
        errors.push('Author must be at least 2 characters.');
      if (controls.author.errors['maxlength'])
        errors.push('Author must be less than 50 characters.');
    }

    if (controls.date?.errors) {
      if (controls.date.errors['required']) errors.push('Date is required.');
    }

    if (controls.description?.errors) {
      if (controls.description.errors['required'])
        errors.push('Description is required.');
      if (controls.description.errors['minlength'])
        errors.push('Description must be at least 10 characters.');
    }

    if (controls.content?.errors) {
      if (controls.content.errors['required'])
        errors.push('Content is required.');
      if (controls.content.errors['minlength'])
        errors.push('Content must be at least 20 characters.');
    }

    return errors;
  }

  private generateUniqueId(existingIds: Set<string | number>): string {
    let id: string;
    do {
      id = Math.floor(100000000 + Math.random() * 900000000).toString();
    } while (existingIds.has(id));
    return id;
  }
}
