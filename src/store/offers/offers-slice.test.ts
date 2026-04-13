import { fetchOffersAction, postFavoriteAction } from '../api-actions';
import { offersReducer } from './offers-slice';
import { mockOffer } from '../../mockData';

describe('FetchOffers Slice', () => {
  it('should set "isOffersLoading" to "true" with fetchOffersAction.pending', () => {
    const initialState = {
      offersList: [],
      isOffersLoading: false,
      isOfferPostingToFavorite: false,
    };

    const result = offersReducer(initialState, fetchOffersAction.pending('', undefined));

    expect(result.isOffersLoading).toBe(true);
  });

  it('should set "offersList" and "isOffersLoading" to "false" with fetchOffersAction.fulfilled', () => {
    const initialState = {
      offersList: [],
      isOffersLoading: true,
      isOfferPostingToFavorite: false,
    };

    const expectedState = {
      offersList: [mockOffer],
      isOffersLoading: false,
      isOfferPostingToFavorite: false,
    };

    const result = offersReducer(initialState, fetchOffersAction.fulfilled([mockOffer], '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "isOffersLoading" to "false" with fetchOffersAction.rejected', () => {
    const initialState = {
      offersList: [],
      isOffersLoading: true,
      isOfferPostingToFavorite: false,
    };

    const result = offersReducer(initialState, fetchOffersAction.rejected(null, '', undefined));

    expect(result.isOffersLoading).toBe(false);
  });

  it('should set "isOfferPostingToFavorite" to "true" with postFavoriteAction.pending', () => {
    const initialState = {
      offersList: [],
      isOffersLoading: false,
      isOfferPostingToFavorite: false,
    };

    const result = offersReducer(initialState, postFavoriteAction.pending('', {
      offerId: '023',
      status: 1,
    }));

    expect(result.isOfferPostingToFavorite).toBe(true);
  });

  it('should update offer and set "isOfferPostingToFavorite" to "false" with postFavoriteAction.fulfilled', () => {
    const initialState = {
      offersList: [mockOffer],
      isOffersLoading: false,
      isOfferPostingToFavorite: true,
    };

    const updatedOffer = { ...mockOffer, isFavorite: !mockOffer.isFavorite };

    const result = offersReducer(initialState, postFavoriteAction.fulfilled(updatedOffer, '', {
      offerId: mockOffer.id,
      status: 1,
    }));

    expect(result.isOfferPostingToFavorite).toBe(false);
    expect(result.offersList[0].isFavorite).toBe(updatedOffer.isFavorite);
  });

  it('should set "isOfferPostingToFavorite" to "false" with postFavoriteAction.rejected', () => {
    const initialState = {
      offersList: [],
      isOffersLoading: false,
      isOfferPostingToFavorite: true,
    };

    const result = offersReducer(initialState, postFavoriteAction.rejected(null, '', {
      offerId: '023',
      status: 1,
    }));

    expect(result.isOfferPostingToFavorite).toBe(false);
  });
});
