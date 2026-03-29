import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { fetchFavoriteOffersActions } from '../api-actions';

type FavoritesState = {
  favorites: Offer[];
  isFavoritesLoading: boolean;
}

const initialState: FavoritesState = {
  favorites: [],
  isFavoritesLoading: false,
};

const favoriteOffersSlice = createSlice({
  name: 'favorite/offers',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteOffersActions.pending, (state) => {
        state.isFavoritesLoading = true;
      })
      .addCase(fetchFavoriteOffersActions.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isFavoritesLoading = false;
      })
      .addCase(fetchFavoriteOffersActions.rejected, (state) => {
        state.isFavoritesLoading = false;
      });
  }
});

export const favoriteOffersReducer = favoriteOffersSlice.reducer;

