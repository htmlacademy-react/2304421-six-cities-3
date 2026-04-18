import { fetchNearbyOffersAction, postFavoriteAction } from '../api-actions';
import { nearbyOffersReducer } from './nearby-offers-slice';
import { mockOffer } from '../../mockTestData';

describe('NearbyOffers Slice', () => {
  it('should set "isNearbyOffersLoading" to "true" with fetchNearbyOffersAction.pending', () => {
    const result = nearbyOffersReducer(undefined, fetchNearbyOffersAction.pending('', '021/nearby'));

    expect(result.isNearbyOffersLoading).toBe(true);
  });

  it('should set "isNearbyOffersLoading" to "false", "nearbyOffers" to array with Offers with fetchNearbyOffersAction.fulfilled', () => {
    const expectedState = {
      nearbyOffers: [mockOffer],
      isNearbyOffersLoading: false,
    };
    const result = nearbyOffersReducer(undefined, fetchNearbyOffersAction.fulfilled([mockOffer], '', '021/nearby'));

    expect(result).toEqual(expectedState);
  });

  it('should set "isNearbyOffersLoading" to "false" with fetchNearbyOffersAction.rejected', () => {
    const result = nearbyOffersReducer(undefined, fetchNearbyOffersAction.rejected(null, '', '021/nearby'));

    expect(result.isNearbyOffersLoading).toBe(false);
  });

  it('should set "nearbyOffers.isFavorite" to "true" with postFavoriteAction.fulfilled', () => {
    const initialState = {
      nearbyOffers: [mockOffer],
      isNearbyOffersLoading: false,
    };
    const updatedOffer = {
      ...mockOffer,
      isFavorite: true,
    };

    const result = nearbyOffersReducer(initialState, postFavoriteAction.fulfilled(updatedOffer, '', {
      offerId: mockOffer.id,
      status: 1,
    }));

    expect(result.nearbyOffers[0].isFavorite).toBe(true);
  });
});
