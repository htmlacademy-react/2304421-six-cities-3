import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { AuthInfo } from '../../types/user-data';

type UserState = {
  authorizationStatus: AuthorizationStatus;
  isLoginLoading: boolean;
  user: AuthInfo | null;
}

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  isLoginLoading: false,
  user: null,
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

    setUser(state, action: PayloadAction<AuthInfo | null>) {
      state.user = action.payload;
    }
  }
});

export const { setAuthorizationStatus, setLoginLoading, setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
