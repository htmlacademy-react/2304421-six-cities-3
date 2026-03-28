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

    updateOffer(state, action: PayloadAction<Offer>) {
      state.offersList = state.offersList.map((offer) =>
        offer.id === action.payload.id ? action.payload : offer
      );

      state.nearbyOffers = state.nearbyOffers.map((offer) =>
        offer.id === action.payload.id ? action.payload : offer
      );
    },

    updateCurrentOffer(state, action: PayloadAction<Offer>) {
      if (state.currentOffer && state.currentOffer.id === action.payload.id) {
        state.currentOffer.isFavorite = action.payload.isFavorite;
      }
    }
  }
});

export const { setOffers, setOffersLoading, setCurrentOffer, setNearbyOffers, setOfferLoading, setNearbyLoading, setOfferNotFound, updateOffer, updateCurrentOffer } = offerSlice.actions;
export const offerReducer = offerSlice.reducer;
