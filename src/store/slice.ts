import { CITIES } from '../const';
import { Offer } from '../types/offer';
import { City } from '../types/city';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';

type AppState = {
  city: City;
  offersList: Offer[];
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isLoginLoading: boolean;
}

const initialState: AppState = {
  city: CITIES[0],
  offersList: [],
  isOffersLoading: true,
  authorizationStatus: AuthorizationStatus.NoAuth,
  error: null,
  isLoginLoading: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<City>) {
      state.city = action.payload;
    },

    setOffers(state, action: PayloadAction<Offer[]>) {
      state.offersList = action.payload;
    },

    setOffersLoading(state, action: PayloadAction<boolean>) {
      state.isOffersLoading = action.payload;
    },

    setAuthorizationStatus(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },

    setLoginLoading(state, action: PayloadAction<boolean>) {
      state.isLoginLoading = action.payload;
    }
  }
});

export const {setCity, setOffers, setOffersLoading, setAuthorizationStatus, setError, setLoginLoading} = appSlice.actions;
export const appReducer = appSlice.reducer;
