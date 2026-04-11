import { Comment } from '../../types/comment';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCommentsAction, postCommentAction } from '../api-actions';

type CommentsState = {
  comments: Comment[];
  isCommentsLoading: boolean;
  isPostingComment: boolean;
  postingComment: string;
  rating: number | null;
}

const initialState: CommentsState = {
  comments: [],
  isCommentsLoading: false,
  isPostingComment: false,
  postingComment: '',
  rating: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComment(state, action: PayloadAction<string>) {
      state.postingComment = action.payload;
    },
    setRating(state, action: PayloadAction<number | null>) {
      state.rating = action.payload;
    }
  },
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
        state.postingComment = '';
        state.rating = null;
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.isPostingComment = false;
      });
  }
});

export const {setComment, setRating} = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
