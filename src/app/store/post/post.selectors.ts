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

export const selectPostFilters = createSelector(selectPostState, (state) => ({
  title: state.filterTitle,
  date: state.filterDate,
}));

export const selectFilteredPosts = createSelector(
  selectPosts,
  selectPostFilters,
  (posts, filters) => {
    return posts.filter((post) => {
      const matchesTitle =
        filters.title === '' ||
        post.title.toLowerCase().includes(filters.title.toLowerCase());

      const matchesDate =
        filters.date === '' || post.date.startsWith(filters.date);

      return matchesTitle && matchesDate;
    });
  },
);
