import { configureStore } from '@reduxjs/toolkit';
import { appReducer, setOffers } from './slice';
import { mockOffers } from '../mocks/mockOffers';

export const store = configureStore({
  reducer: {
    app: appReducer
  }
});
store.dispatch(setOffers(mockOffers));
