import { OfferDetails } from '../../types/offer-details';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CurrentOfferState = {
  currentOffer: OfferDetails | null;
  isCurrentOfferLoading: boolean;
  isCurrentOfferNotFound: boolean;
}

const initialState: CurrentOfferState = {
  currentOffer: null,
  isCurrentOfferLoading: false,
  isCurrentOfferNotFound: false,
};

const currentOfferSlice = createSlice({
  name: 'current/offer',
  initialState,
  reducers: {
    setCurrentOffer(state, action: PayloadAction<OfferDetails | null>) {
      state.currentOffer = action.payload;
    },

    setCurrentOfferNotFound(state, action: PayloadAction<boolean>) {
      state.isCurrentOfferNotFound = action.payload;
    },

    setCurrentOfferLoading(state, action: PayloadAction<boolean>) {
      state.isCurrentOfferLoading = action.payload;
    },
  }
});

export const { setCurrentOffer, setCurrentOfferLoading, setCurrentOfferNotFound } = currentOfferSlice.actions;
export const currentOfferReducer = currentOfferSlice.reducer;
