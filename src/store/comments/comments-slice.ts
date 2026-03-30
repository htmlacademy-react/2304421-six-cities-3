import { Comment } from '../../types/comment';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCommentsAction, postCommentAction } from '../api-actions';

type CommentsState = {
  comments: Comment[];
  isCommentsLoading: boolean;
  isPostingComment: boolean;
}

const initialState: CommentsState = {
  comments: [],
  isCommentsLoading: false,
  isPostingComment: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isCommentsLoading = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.isCommentsLoading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.isCommentsLoading = false;
      })
      .addCase(postCommentAction.pending, (state) => {
        state.isPostingComment = true;
      })
      .addCase(postCommentAction.fulfilled, (state) => {
        state.isPostingComment = false;
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.isPostingComment = false;
      });
  }
});

export const commentsReducer = commentsSlice.reducer;
