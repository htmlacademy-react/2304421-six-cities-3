import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '../types/state.js';
import {Offer} from '../types/offer';
import {APIRoute} from '../const';
import { setError } from './error/error-slice.js';
import { AuthData } from '../types/auth-data.js';
import { AuthInfo } from '../types/user-data.js';
import { saveToken, dropToken } from '../services/token.js';
import { TIMEOUT_SHOW_ERROR } from '../const';
import { OfferDetails } from '../types/offer-details.js';
import { Comment } from '../types/comment.js';


export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  }
);

export const fetchFavoriteOffersActions = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'favorite/fetch',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Favorites);
    return data;
  }
);

export const fetchOfferByIdAction = createAsyncThunk<OfferDetails, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'offer/fetchById',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<OfferDetails>(`${APIRoute.Offers}/${offerId}`);
    return data;
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<Offer[], string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'offer/fetchNearby',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  }
);

export const fetchCommentsAction = createAsyncThunk<Comment[], string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'offer/fetchComments',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`);
    return data;
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
    await api.post<Comment>(`${APIRoute.Comments}/${offerId}`, {rating, comment});
    dispatch(fetchCommentsAction(offerId));
  }
);

export const postFavoriteAction = createAsyncThunk<Offer, {offerId: string; status: number},
{
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'favorite/post',
  async ({offerId, status}, {extra: api}) => {
    const {data} = await api.post<Offer>(`${APIRoute.Favorites}/${offerId}/${status}`);
    return data;
  }
);


export const checkAuthAction = createAsyncThunk<AuthInfo, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<AuthInfo>(APIRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<AuthInfo, AuthData, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
  rejectValue: string;
}>(
  'user/login',
  async({login: email, password}, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.post<AuthInfo>(APIRoute.Login, {email, password});
      saveToken(data.token);
      return data;
    } catch {
      return rejectWithValue('Failed to login, try one more time');
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
  rejectValue: string;
}>(
  'user/logout',
  async (_arg, {extra: api, rejectWithValue}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
    } catch {
      return rejectWithValue('Failded to logout, try one more time');
    }
  },
);

export const clearErrorAction = createAsyncThunk(
  'clearError',
  (_arg, {dispatch}) => {
    setTimeout(
      () => {
        dispatch(setError(null));
      },
      TIMEOUT_SHOW_ERROR,
    );
  }
);


