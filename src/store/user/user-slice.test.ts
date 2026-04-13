import { AuthorizationStatus } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userReducer } from './user-slice';
import { mockUser } from '../../mockData';
import { mockAuthData } from '../../mockData';

describe('User Slice', () => {
  it('should set "isLoginLoading" to "true", "authorizationStatus" to "Unknown" with checkAuthAction.pending', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      isLoginLoading: false,
      user: null,
    };

    const result = userReducer(initialState, checkAuthAction.pending('', undefined));

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Unknown);
    expect(result.isLoginLoading).toBe(true);
    expect(result.user).toBeNull();
  });

  it('should set "user", "isLoginLoading" to "false", "authorizationStatus" to "Auth" with checkAuthAction.fulfilled', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      isLoginLoading: true,
      user: null,
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      isLoginLoading: false,
      user: mockUser,
    };

    const result = userReducer(initialState, checkAuthAction.fulfilled(mockUser, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "user" to null, "isLoginLoading" to "false", "authorizationStatus" to "NoAuth" with checkAuthAction.rejected', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      isLoginLoading: true,
      user: mockUser,
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      isLoginLoading: false,
      user: null,
    };

    const result = userReducer(initialState, checkAuthAction.rejected(null, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "isLoginLoading" to "true", "authorizationStatus" to "Unknown" with loginAction.pending', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      isLoginLoading: false,
      user: null,
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      isLoginLoading: true,
      user: null,
    };

    const result = userReducer(initialState, loginAction.pending('', mockAuthData));

    expect(result).toEqual(expectedState);
  });

  it('should set "user", "isLoginLoading" to "false", "authorizationStatus" to "Auth" with loginAction.fulfilled', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      isLoginLoading: true,
      user: null,
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      isLoginLoading: false,
      user: mockUser,
    };

    const result = userReducer(initialState, loginAction.fulfilled(mockUser, '', mockAuthData));

    expect(result).toEqual(expectedState);
  });

  it('should set "user" to "null", "isLoginLoading" to "false", "authorizationStatus" to "NoAuth" with loginAction.rejected', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      isLoginLoading: true,
      user: mockUser,
    };

    const result = userReducer(initialState, loginAction.rejected(null,'', mockAuthData));

    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(result.isLoginLoading).toBe(false);
    expect(result.user).toBeNull();
  });

  it('should set "isLoginLoading" to "true", "authorizationStatus" to "Unknown" with logoutAction.pending', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      isLoginLoading: false,
      user: mockUser,
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      isLoginLoading: true,
      user: mockUser,
    };

    const result = userReducer(initialState, logoutAction.pending('', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "user" to "null", "isLoginLoading" to "false", "authorizationStatus" to "NoAuth" with logoutAction.fulfilled', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      isLoginLoading: true,
      user: mockUser,
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      isLoginLoading: false,
      user: null,
    };

    const result = userReducer(initialState, logoutAction.fulfilled(undefined, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "isLoginLoading" to "false", "authorizationStatus" to "Auth" with logoutAction.rejected', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      isLoginLoading: true,
      user: mockUser,
    };

    const result = userReducer(initialState, logoutAction.rejected(null, '', undefined));

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(result.isLoginLoading).toBe(false);
    expect(result.user).toEqual(mockUser);
  });
});
