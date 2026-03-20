import { Offer } from '../../types/offer';
import { OfferDetails } from '../../types/offer-details';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OfferState = {
  offersList: Offer[];
  isOffersLoading: boolean;
  currentOffer: OfferDetails | null;
  nearbyOffers: Offer[];
  isOfferLoading: boolean;
  isNearbyLoading: boolean;
  isOfferNotFound: boolean;
}

const initialState: OfferState = {
  offersList: [],
  isOffersLoading: true,
  currentOffer: null,
  nearbyOffers: [],
  isOfferLoading: false,
  isNearbyLoading: false,
  isOfferNotFound: false,
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    setOffers(state, action: PayloadAction<Offer[]>) {
      state.offersList = action.payload;
    },

    setOffersLoading(state, action: PayloadAction<boolean>) {
      state.isOffersLoading = action.payload;
    },

    setCurrentOffer(state, action: PayloadAction<OfferDetails | null>) {
      state.currentOffer = action.payload;
    },

    setOfferNotFound(state, action: PayloadAction<boolean>) {
      state.isOfferNotFound = action.payload;
    },

    setNearbyOffers(state, action: PayloadAction<Offer[]>) {
      state.nearbyOffers = action.payload;
    },

    setOfferLoading(state, action: PayloadAction<boolean>) {
      state.isOfferLoading = action.payload;
    },

    setNearbyLoading(state, action: PayloadAction<boolean>) {
      state.isNearbyLoading = action.payload;
    },
  }
});

export const { setOffers, setOffersLoading, setCurrentOffer, setNearbyOffers, setOfferLoading, setNearbyLoading, setOfferNotFound } = offerSlice.actions;
export const offerReducer = offerSlice.reducer;
