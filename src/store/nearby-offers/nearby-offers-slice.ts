import { Offer } from '../../types/offer';
import { createSlice } from '@reduxjs/toolkit';
import { fetchNearbyOffersAction, postFavoriteAction } from '../api-actions';

type OfferState = {
  nearbyOffers: Offer[];
  isNearbyOffersLoading: boolean;
}

const initialState: OfferState = {
  nearbyOffers: [],
  isNearbyOffersLoading: false,
};

const nearbyOfferSlice = createSlice({
  name: 'nearby/offers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isNearbyOffersLoading = true;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.isNearbyOffersLoading = false;
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.isNearbyOffersLoading = false;
      })
      .addCase(postFavoriteAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        state.nearbyOffers = state.nearbyOffers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer);
      });
  }
});

export const nearbyOffersReducer = nearbyOfferSlice.reducer;
