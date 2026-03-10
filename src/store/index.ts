import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { setOffers } from './action';
import { mockOffers } from '../mocks/mockOffers';

export const store = configureStore({reducer});
store.dispatch(setOffers(mockOffers));
