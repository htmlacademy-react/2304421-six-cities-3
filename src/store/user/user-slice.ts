import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';

type UserState = {
  authorizationStatus: AuthorizationStatus;
  isLoginLoading: boolean;
}

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  isLoginLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorizationStatus(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },

    setLoginLoading(state, action: PayloadAction<boolean>) {
      state.isLoginLoading = action.payload;
    },
  }
});

export const { setAuthorizationStatus, setLoginLoading } = userSlice.actions;
export const userReducer = userSlice.reducer;
