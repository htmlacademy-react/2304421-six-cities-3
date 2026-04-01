import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { AuthInfo } from '../../types/user-data';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

type UserState = {
  authorizationStatus: AuthorizationStatus;
  isLoginLoading: boolean;
  user: AuthInfo | null;
  loginError: string | null | undefined;
  logoutError: string | null | undefined;
}

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isLoginLoading: false,
  user: null,
  loginError: null,
  logoutError: null,
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
        state.loginError = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoginLoading = false;
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.loginError = action.payload;
      })
      .addCase(logoutAction.pending, (state) => {
        state.isLoginLoading = true;
        state.logoutError = null;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoginLoading = false;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.logoutError = action.payload;
      });
  }
});

export const userReducer = userSlice.reducer;
