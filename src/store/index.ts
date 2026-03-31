import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { offersReducer } from './offers/offers-slice';
import { commentsReducer } from './comments/comments-slice';
import { userReducer } from './user/user-slice';
import { cityReducer } from './city/city-slice';
import { errorReducer } from './error/error-slice';
import { createAPI } from '../services/api';
import { currentOfferReducer } from './current-offer/current-offer-slice';
import { nearbyOffersReducer } from './nearby-offers/nearby-offers-slice';
import { favoriteOffersReducer } from './favorite-offers/favorite-offers-slice';

export const rootReducer = combineReducers({
  offers: offersReducer,
  comments: commentsReducer,
  user: userReducer,
  city: cityReducer,
  error: errorReducer,
  currentOffer: currentOfferReducer,
  nearbyOffers: nearbyOffersReducer,
  favoriteOffers: favoriteOffersReducer,
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

