import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { offerReducer } from './offer/offer-slice';
import { commentsReducer } from './comments/comments-slice';
import { userReducer } from './user/user-slice';
import { cityReducer } from './city/city-slice';
import { errorReducer } from './error/error-slice';
import { createAPI } from '../services/api';

export const rootReducer = combineReducers({
  offer: offerReducer,
  comments: commentsReducer,
  user: userReducer,
  city: cityReducer,
  error: errorReducer,
});

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    })
});

