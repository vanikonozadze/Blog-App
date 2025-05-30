import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../../core/services/post.service';
import {
  addPost,
  addPostFailure,
  addPostSuccess,
  deletePost,
  deletePostFailure,
  deletePostSuccess,
  loadPostById,
  loadPostByIdFailure,
  loadPostByIdSuccess,
  loadPosts,
  loadPostsFailure,
  loadPostsSuccess,
  updatePost,
  updatePostFailure,
  updatePostSuccess,
} from './post.actions';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

@Injectable()
export class postEffects {
  actions$ = inject(Actions);
  postService = inject(PostService);

  _loadPosts = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      exhaustMap(() => {
        return this.postService.getPosts$().pipe(
          map((data) => {
            return loadPostsSuccess({ posts: data });
          }),
          catchError((err) => of(loadPostsFailure({ error: err.message }))),
        );
      }),
    ),
  );

  _loadPostById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPostById),
      switchMap((action) =>
        this.postService.getPostById$(action.id).pipe(
          map((post) => loadPostByIdSuccess({ post })),
          catchError((error) =>
            of(loadPostByIdFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  _deletePosts = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePost),
      switchMap((action) =>
        this.postService.deletePost$(action.id).pipe(
          map(() => deletePostSuccess({ id: action.id })),
          catchError((err) => of(deletePostFailure({ error: err.message }))),
        ),
      ),
    ),
  );

  _editPost = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePost),
      switchMap((action) =>
        this.postService.updatePost$(action.post).pipe(
          map(() => updatePostSuccess({ post: action.post })),
          catchError((err) => of(updatePostFailure({ error: err.message }))),
        ),
      ),
    ),
  );

  _addPost = createEffect(() =>
    this.actions$.pipe(
      ofType(addPost),
      switchMap((action) =>
        this.postService.createPost$(action.post).pipe(
          map(() => addPostSuccess({ post: action.post })),
          catchError((err) => of(addPostFailure({ error: err.message }))),
        ),
      ),
    ),
  );
}
