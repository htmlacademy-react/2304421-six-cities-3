import { fetchFavoriteOffersActions } from '../api-actions';
import { favoriteOffersReducer } from './favorite-offers-slice';
import { mockOffer } from '../../mockTestData';

describe('FavoriteOffers Slice', () => {
  it('should return initialState with empty action', () => {
    const initialState = {
      favorites: [],
      isFavoritesLoading: false,
    };

    const result = favoriteOffersReducer(initialState, {type: ''});

    expect(result).toEqual(initialState);
  });

  it('should set "isFavoritesLoading" to "true" with fetchFavoriteOffersAction.pending', () => {
    const initialState = {
      favorites: [],
      isFavoritesLoading: false,
    };

    const result = favoriteOffersReducer(initialState, fetchFavoriteOffersActions.pending('', undefined));

    expect(result.isFavoritesLoading).toBe(true);
  });

  it('should set "isFavoritesLoading" to "false", "favorites" to array with offers with fetchFavoriteOffersAction.fulfilled', () => {
    const expectedState = {
      favorites: [mockOffer],
      isFavoritesLoading: false,
    };

    const result = favoriteOffersReducer(expectedState, fetchFavoriteOffersActions.fulfilled([mockOffer], '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "isFavoritesLoading" to "false" with fetchFavoriteOffersAction.rejected', () => {
    const result = favoriteOffersReducer(undefined, fetchFavoriteOffersActions.rejected(null, '', undefined));

    expect(result.isFavoritesLoading).toBe(false);
  });
});
