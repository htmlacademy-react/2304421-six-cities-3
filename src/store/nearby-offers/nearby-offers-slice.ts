import { Offer } from '../../types/offer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  reducers: {
    setNearbyOffers(state, action: PayloadAction<Offer[]>) {
      state.nearbyOffers = action.payload;
    },

    setNearbyOffersLoading(state, action: PayloadAction<boolean>) {
      state.isNearbyOffersLoading = action.payload;
    },
  }
});

export const { setNearbyOffers, setNearbyOffersLoading } = nearbyOfferSlice.actions;
export const nearbyOffersReducer = nearbyOfferSlice.reducer;
