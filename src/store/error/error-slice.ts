import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ErrorState = {
  error: string | null;
}

const initialState: ErrorState = {
  error: null,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  }
});

export const { setError } = errorSlice.actions;
export const errorReducer = errorSlice.reducer;
