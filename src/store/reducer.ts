import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../const';
import { cityChange, offersListFilling } from './action';
import { City, Offer } from '../types/types';

type State = {
  city: City;
  offersList: Offer[];
}

const initialState: State = {
  city: CITIES[3],
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
