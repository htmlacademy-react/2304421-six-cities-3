import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { offersListFilling } from './action';
import { mockOffers } from '../mocks/mockOffers';

export const store = configureStore({reducer});
store.dispatch(offersListFilling(mockOffers));
