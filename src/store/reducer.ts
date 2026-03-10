import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../const';
import { setOffers, setCity } from './action';
import { Offer } from '../types/offer';
import { City } from '../types/city';

type State = {
  city: City;
  offersList: Offer[];
}

const initialState: State = {
  city: CITIES[0],
  offersList: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offersList = action.payload;
    });
});

export { reducer };
