import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { City } from '../types/city';

export const setCity = createAction<City>('cityChange');
export const setOffers = createAction<Offer[]>('offersListFilling');
