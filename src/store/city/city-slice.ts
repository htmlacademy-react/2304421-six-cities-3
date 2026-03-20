import { CITIES } from '../../const';
import { City } from '../../types/city';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CityState = {
  city: City;
}

const initialState: CityState = {
  city: CITIES[0],
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<City>) {
      state.city = action.payload;
    },
  }
});

export const { setCity } = citySlice.actions;
export const cityReducer = citySlice.reducer;
