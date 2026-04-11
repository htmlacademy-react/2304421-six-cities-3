import { Offer } from '../../types/offer';
import { createSlice } from '@reduxjs/toolkit';
import { fetchOffersAction, postFavoriteAction } from '../api-actions';

type OffersState = {
  offersList: Offer[];
  isOffersLoading: boolean;
  isOfferPostingToFavorite: boolean;
};

const initialState: OffersState = {
  offersList: [],
  isOffersLoading: false,
  isOfferPostingToFavorite: false,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offersList = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
      })
      .addCase(postFavoriteAction.pending, (state) => {
        state.isOfferPostingToFavorite = true;
      })
      .addCase(postFavoriteAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        state.isOfferPostingToFavorite = false;

        state.offersList = state.offersList.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );
      })
      .addCase(postFavoriteAction.rejected, (state) => {
        state.isOfferPostingToFavorite = false;
      });
  },
});

export const offersReducer = offersSlice.reducer;
