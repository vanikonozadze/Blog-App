import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectPostById } from '../../store/post/post.selectors';
import { catchError, filter, of, switchMap } from 'rxjs';
import { take } from 'rxjs/operators';
import { loadPostById } from '../../store/post/post.actions';

export const postResolver: ResolveFn<any> = (route, state) => {
  const store = inject(Store<AppState>);
  const postId = route.paramMap.get('id');

  if (!postId) {
    return of(null);
  }

  return store.select(selectPostById(postId)).pipe(
    take(1),
    switchMap((post) => {
      if (post) {
        return of(post);
      } else {
        store.dispatch(loadPostById({ id: postId }));

        return store.select(selectPostById(postId)).pipe(
          filter((loadedPost) => !!loadedPost),
          take(1),
          catchError(() => of(null)),
        );
      }
    }),
  );
};
