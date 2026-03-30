import { Offer } from '../../types/offer';
import { createSlice } from '@reduxjs/toolkit';
import { fetchOffersAction, postFavoriteAction } from '../api-actions';

type OffersState = {
  offersList: Offer[];
  isOffersLoading: boolean;
};

const initialState: OffersState = {
  offersList: [],
  isOffersLoading: true,
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
      .addCase(postFavoriteAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        state.offersList = state.offersList.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );
      });
  },
});

export const offersReducer = offersSlice.reducer;
