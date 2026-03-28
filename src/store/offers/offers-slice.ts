import { Offer } from '../../types/offer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OffersState = {
  offersList: Offer[];
  isOffersLoading: boolean;
}

const initialState: OffersState = {
  offersList: [],
  isOffersLoading: true,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setOffers(state, action: PayloadAction<Offer[]>) {
      state.offersList = action.payload;
    },

    setOffersLoading(state, action: PayloadAction<boolean>) {
      state.isOffersLoading = action.payload;
    },

    setUpdatedOffers(state, action: PayloadAction<Offer>) {
      state.offersList = state.offersList.map((offer) =>
        offer.id === action.payload.id ? action.payload : offer
      );
    },

  }
});

export const { setOffers, setOffersLoading, setUpdatedOffers } = offersSlice.actions;
export const offersReducer = offersSlice.reducer;
