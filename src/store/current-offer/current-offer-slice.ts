import { OfferDetails } from '../../types/offer-details';
import { createSlice } from '@reduxjs/toolkit';
import { fetchOfferByIdAction, postFavoriteAction } from '../api-actions';

type CurrentOfferState = {
  currentOffer: OfferDetails | null;
  isCurrentOfferLoading: boolean;
  isCurrentOfferNotFound: boolean;
};

const initialState: CurrentOfferState = {
  currentOffer: null,
  isCurrentOfferLoading: false,
  isCurrentOfferNotFound: false,
};

const currentOfferSlice = createSlice({
  name: 'current/offer',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferByIdAction.pending, (state) => {
        state.isCurrentOfferLoading = true;
        state.isCurrentOfferNotFound = false;
      })
      .addCase(fetchOfferByIdAction.fulfilled, (state, action) => {
        state.isCurrentOfferLoading = false;
        state.currentOffer = action.payload;
      })
      .addCase(fetchOfferByIdAction.rejected, (state) => {
        state.isCurrentOfferLoading = false;
        state.isCurrentOfferNotFound = true;
      })
      .addCase(postFavoriteAction.fulfilled, (state, action) => {
        const updatedCurrentOffer = action.payload;

        if (state.currentOffer?.id === updatedCurrentOffer.id) {
          state.currentOffer.isFavorite = updatedCurrentOffer.isFavorite;
        }
      });
  },
});

export const currentOfferReducer = currentOfferSlice.reducer;
