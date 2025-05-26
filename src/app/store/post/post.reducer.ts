import { createReducer, on } from '@ngrx/store';
import * as PostActions from './post.actions';
import { IPost } from '../../core/models/post.model';
import { setPostFilterTitle, sortPostsByDate } from './post.actions';

export interface PostState {
  data: IPost[];
  loading: boolean;
  error: string | null;
  currentPost: IPost | null;
  selectedPostId: string | number | null;
  filter: {
    title: string;
    dateSortDirection: 'asc' | 'desc' | null;
  };
}

const initialState: PostState = {
  data: [],
  loading: false,
  error: null,
  currentPost: null,
  selectedPostId: '',
  filter: {
    title: '',
    dateSortDirection: null,
  },
};

export const postReducer = createReducer(
  initialState,
  on(PostActions.loadPosts, (state) => ({ ...state, loading: true })),
  on(PostActions.loadPostsSuccess, (state, { posts }) => ({
    ...state,
    data: [...posts],
    loading: false,
    error: null,
  })),
  on(PostActions.loadPostsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(PostActions.loadPostById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PostActions.loadPostByIdSuccess, (state, { post }) => ({
    ...state,
    loading: false,
    error: null,
    currentPost: post,
    data: state.data.some((p) => p.id === post.id)
      ? state.data
      : [...state.data, post],
  })),

  on(PostActions.loadPostByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(PostActions.deletePostSuccess, (state, { id }) => ({
    ...state,
    data: state.data.filter((p) => p.id !== id),
  })),
  on(PostActions.addPostSuccess, (state, { post }) => ({
    ...state,
    data: [...state.data, post],
  })),
  on(PostActions.updatePostSuccess, (state, { post }) => ({
    ...state,
    data: state.data.map((p) => (p.id === post.id ? post : p)),
  })),
  on(PostActions.selectP, (state, { id }) => ({
    ...state,
    selectedPostId: id,
  })),
  on(setPostFilterTitle, (state, { title }) => ({
    ...state,
    filter: { ...state.filter, title },
  })),
  on(setPostFilterTitle, (state, { title }) => ({
    ...state,
    filter: { ...state.filter, title },
  })),
  on(sortPostsByDate, (state, { direction }) => {
    const sortedPosts = [...state.data].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return direction === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return {
      ...state,
      filter: { ...state.filter, dateSortDirection: direction },
      data: sortedPosts,
    };
  }),
);
