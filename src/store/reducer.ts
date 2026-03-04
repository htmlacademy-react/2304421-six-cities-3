import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../const';
import { cityChange, offersListFilling } from './action';
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
    .addCase(cityChange, (state, action) => {
      state.city = action.payload;
    })
    .addCase(offersListFilling, (state, action) => {
      state.offersList = action.payload;
    });
});

export { reducer };
