import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectPostById } from '../../store/post/post.selectors';

export const postResolver: ResolveFn<any> = (route, state) => {
  const store = inject(Store<AppState>);
  const clientId = route.paramMap.get('id');
  return store.select(selectPostById(clientId));
};
