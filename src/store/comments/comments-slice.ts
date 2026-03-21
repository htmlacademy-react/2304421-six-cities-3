import { Comment } from '../../types/comment';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CommentsState = {
  comments: Comment[];
  isCommentsLoading: boolean;
}

const initialState: CommentsState = {
  comments: [],
  isCommentsLoading: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<Comment[]>) {
      state.comments = action.payload;
    },

    setCommentsLoading(state, action: PayloadAction<boolean>) {
      state.isCommentsLoading = action.payload;
    }
  }
});

export const { setComments, setCommentsLoading } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
