import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './post.reducer';

export const selectPostState = createFeatureSelector<PostState>('posts');

export const selectPost = createSelector(selectPostState, (state) => {
  return state.data;
});

export const selectPosts = createSelector(
  selectPostState,
  (state) => state.data,
);

export const selectPostById = (id: string | null) =>
  createSelector(selectPostState, (state) => {
    return state.data.find((post) => post.id === id);
  });

export const selectPostFilter = createSelector(
  selectPostState,
  (state: PostState) => state.filter,
);

export const selectFilteredPosts = createSelector(
  selectPostState,
  (state: PostState) => {
    const title = state.filter.title.toLowerCase();
    return state.data.filter((post) =>
      post.title.toLowerCase().includes(title),
    );
  },
);
