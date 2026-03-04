import { createAction } from '@reduxjs/toolkit';
import { City, Offer } from '../types/types';

export const cityChange = createAction<City>('cityChange');
export const offersListFilling = createAction<Offer[]>('offersListFilling');
