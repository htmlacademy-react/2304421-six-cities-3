import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { City } from '../types/city';

export const cityChange = createAction<City>('cityChange');
export const offersListFilling = createAction<Offer[]>('offersListFilling');
