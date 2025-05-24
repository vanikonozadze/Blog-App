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
export const selectLoading = createSelector(
  selectPostState,
  (state) => state.loading,
);
export const selectError = createSelector(
  selectPostState,
  (state) => state.error,
);
