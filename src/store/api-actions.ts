import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '../types/state.js';
import {Offer} from '../types/offer';
import {APIRoute} from '../const';
import { setOffers, setOffersLoading, setOfferLoading, setCurrentOffer, setNearbyOffers, setNearbyLoading, setOfferNotFound } from './offer/offer-slice.js';
import { setAuthorizationStatus, setLoginLoading, setUser } from './user/user-slice.js';
import { setComments, setCommentsLoading } from './comments/comments-slice.js';
import { setError } from './error/error-slice.js';
import { AuthorizationStatus } from '../const';
import { AuthData } from '../types/auth-data.js';
import { AuthInfo } from '../types/user-data.js';
import { saveToken, dropToken } from '../services/token.js';
import { TIMEOUT_SHOW_ERROR } from '../const';
import { store } from './index.js';
import { OfferDetails } from '../types/offer-details.js';
import { Comment } from '../types/comment.js';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(setOffersLoading(true));
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      dispatch(setOffers(data));
    } finally {
      dispatch(setOffersLoading(false));
    }
  },
);

export const fetchOfferByIdAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'offer/fetchById',
  async (offerId, {dispatch, extra: api}) => {
    try{
      dispatch(setOfferLoading(true));
      dispatch(setOfferNotFound(false));

      const {data} = await api.get<OfferDetails>(`${APIRoute.Offers}/${offerId}`);
      dispatch(setCurrentOffer(data));
    } catch {
      dispatch(setOfferNotFound(true));
    } finally {
      dispatch(setOfferLoading(false));
    }
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'offer/fetchNearby',
  async (offerId, {dispatch, extra: api}) => {
    try{
      dispatch(setNearbyLoading(true));
      const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
      dispatch(setNearbyOffers(data));
    } catch {
      dispatch(setError('Failed to load nearby offers'));
    } finally {
      dispatch(setNearbyLoading(false));
    }
  }
);

export const fetchCommentsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'offer/fetchComments',
  async (offerId, {dispatch, extra: api}) => {
    try{
      dispatch(setCommentsLoading(true));
      const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`);
      dispatch(setComments(data));
    } catch {
      dispatch(setError('Failed to load offer comments'));
    } finally {
      dispatch(setCommentsLoading(false));
    }
  }
);

export const postCommentAction = createAsyncThunk<void, {offerId: string; rating: number; comment:string},
{
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'comments/post',
  async ({offerId, rating, comment}, {dispatch, extra: api}) => {
    try{
      dispatch(setCommentsLoading(true));
      await api.post<Comment[]>(`${APIRoute.Comments}/${offerId}`, {rating, comment});
      dispatch(fetchCommentsAction(offerId));
    } finally {
      dispatch(setCommentsLoading(false));
    }
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<AuthInfo>(APIRoute.Login);
      dispatch(setUser(data));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/login',
  async({login: email, password}, {dispatch, extra: api}) => {
    try {
      dispatch(setLoginLoading(true));
      const data = await api.post<AuthInfo>(APIRoute.Login, {email, password});
      saveToken(data.data.token);
      dispatch(setUser(data.data));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setError('Login failed'));
    } finally {
      dispatch(setLoginLoading(false));
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setUser(null));
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  },
);

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  }
);


