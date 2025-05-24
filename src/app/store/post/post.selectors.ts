import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './post.reducer';

export const selectPostState = createFeatureSelector<PostState>('posts');

export const selectPosts = createSelector(
  selectPostState,
  (state) => state.data
);
export const selectPostById = (postId: number) =>
  createSelector(selectPosts, (posts) => posts.find(p => p.id === postId));
export const selectSelectedPostId = createSelector(
  selectPostState,
  (state) => state.selectedPostId
);
export const selectPost = createSelector(
  selectPosts,
  selectSelectedPostId,
  (posts, selectedId) => posts.find(p => p.id === selectedId) ?? null
);
export const selectLoading = createSelector(selectPostState, (state) => state.loading);
export const selectError = createSelector(selectPostState, (state) => state.error);
