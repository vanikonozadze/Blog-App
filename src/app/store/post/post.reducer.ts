import { createReducer, on } from '@ngrx/store';
import * as PostActions from './post.actions';
import { IPost } from '../../core/models/post.model';

export interface PostState {
  data: IPost[];
  loading: boolean;
  error: string | null;
  selectedPostId: string | number | null;
}

const initialState: PostState = {
  data: [],
  loading: false,
  error: null,
  selectedPostId: '',
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
);
