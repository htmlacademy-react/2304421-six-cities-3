import { fetchOfferByIdAction, postFavoriteAction } from '../api-actions';
import { currentOfferReducer } from './current-offer-slice';
import { mockOfferDetails, mockOffer } from '../../mockTestData';

describe('CurrentOffer Slice', () => {
  it('should set "isCurrentOfferLoading" to "true", "isCurrentOfferNotFound" to "false" with fetchOfferByIdAction.pending', () => {
    const expectedState = {
      currentOffer: null,
      isCurrentOfferLoading: true,
      isCurrentOfferNotFound: false,
    };

    const result = currentOfferReducer(
      undefined,
      fetchOfferByIdAction.pending('', '0212'),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isCurrentOfferLoading" to "false", "currentOffer" to object with fetchOfferByIdAction.fulfilled', () => {
    const expectedState = {
      currentOffer: mockOfferDetails,
      isCurrentOfferLoading: false,
      isCurrentOfferNotFound: false,
    };
    const result = currentOfferReducer(
      undefined,
      fetchOfferByIdAction.fulfilled(mockOfferDetails, '', '0212'),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isCurrentOfferLoading" to "false", "isCurrentOfferNotFound" to "true" with fetchOfferByIdAction.rejected', () => {
    const expectedState = {
      currentOffer: null,
      isCurrentOfferLoading: false,
      isCurrentOfferNotFound: true,
    };

    const result = currentOfferReducer(undefined, fetchOfferByIdAction.rejected(null, '', '0212'));

    expect(result).toEqual(expectedState);
  });

  it('should set "currentOffer.isFavorite" to "true", with postFavoriteAction.fulfilled', () => {
    const initialState = {
      currentOffer: mockOfferDetails,
      isCurrentOfferLoading: false,
      isCurrentOfferNotFound: false,
    };
    const updatedOffer = {
      ...mockOffer,
      id: '0212',
      isFavorite: true,
    };
    const result = currentOfferReducer(initialState, postFavoriteAction.fulfilled(updatedOffer, '', {
      offerId: '0212',
      status: 1,
    }));

    expect(result.currentOffer).not.toBeNull();
    expect(result.currentOffer?.isFavorite).toBe(true);
  });
});
