import { CITIES } from '../const';
import { Offer } from '../types/offer';
import { City } from '../types/city';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppState = {
  city: City;
  offersList: Offer[];
  isOffersLoading: boolean;
}

const initialState: AppState = {
  city: CITIES[0],
  offersList: [],
  isOffersLoading: true,
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
    }
  }
});

export const {setCity, setOffers, setOffersLoading} = appSlice.actions;
export const appReducer = appSlice.reducer;
