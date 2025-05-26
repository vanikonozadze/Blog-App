import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './post.reducer';

export const selectPostState = createFeatureSelector<PostState>('posts');

export const selectPosts = createSelector(
  selectPostState,
  (state) => state.data,
);

export const selectPostById = (id: string | null) =>
  createSelector(selectPostState, (state) => {
    if (!id) return null;
    return state.data.find((post) => post.id === id) || null;
  });

export const selectFilteredPosts = createSelector(
  selectPostState,
  (state: PostState) => {
    const title = state.filter.title.toLowerCase();
    return state.data.filter((post) =>
      post.title.toLowerCase().includes(title),
    );
  },
);
