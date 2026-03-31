import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { AuthInfo } from '../../types/user-data';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

type UserState = {
  authorizationStatus: AuthorizationStatus;
  isLoginLoading: boolean;
  user: AuthInfo | null;
}

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isLoginLoading: false,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.isLoginLoading = true;
        state.authorizationStatus = AuthorizationStatus.Unknown;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.isLoginLoading = false;
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.isLoginLoading = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      })
      .addCase(loginAction.pending, (state) => {
        state.isLoginLoading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoginLoading = false;
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.isLoginLoading = false;
      })
      .addCase(logoutAction.pending, (state) => {
        state.isLoginLoading = true;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.isLoginLoading = false;
      });
  }
});

export const userReducer = userSlice.reducer;
