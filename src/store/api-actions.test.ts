import { createAPI } from '../services/api';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../types/state';
import { APIRoute, AuthorizationStatus } from '../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppThunkDispatch, extractActionsTypes, mockOffer, mockCity } from '../utils/utils';
import { fetchFavoriteOffersActions, fetchOffersAction } from './api-actions';
import MockAdapter from 'axios-mock-adapter';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];

  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      offers: {
        offersList: [],
        isOffersLoading: false,
        isOfferPostingToFavorite: false,
      },
      comments: {
        comments: [],
        isCommentsLoading: false,
        isPostingComment: false,
        postingComment: '',
        rating: null,
      },
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        isLoginLoading: false,
        user: null,
      },
      city: {
        city: mockCity,
      },
      error: {
        error: null,
      },
      currentOffer: {
        currentOffer: null,
        isCurrentOfferLoading: false,
        isCurrentOfferNotFound: false,
      },
      nearbyOffers: {
        nearbyOffers: [],
        isNearbyOffersLoading: false,
      },
      favoriteOffers: {
        favorites: [],
        isFavoritesLoading: false,
      },
    });
  });

  afterEach(() => {
    mockAxiosAdapter.reset();
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.fulfilled" with thunk "fetchOffersAction"', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, [mockOffer]);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.rejected" with expected payload', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400);

      await store.dispatch(fetchOffersAction());
      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);
      const rejectedAction = actions[1] as ReturnType<typeof fetchOffersAction.rejected>;

      expect(actionTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
      expect(rejectedAction.payload).toBe('Failed to fetch offers from server');
    });
  });
  describe('fetchFavoritesOffersActions', () => {
    it('should dispatch "fetchFavoriteOffersActions.pending" and "fetchFavoriteOffersActions.fulfilled" with thunk "fetchFavoriteOffersAction"', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(200, [mockOffer]);

      await store.dispatch(fetchFavoriteOffersActions());
      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);

      expect(actionTypes).toEqual([
        fetchFavoriteOffersActions.pending.type,
        fetchFavoriteOffersActions.fulfilled.type,
      ]);
    });
  });
  describe('fetchFavoriteOffersActions', () => {
    it('should dispatch "fetchFavoriteOffersActions.pending" and "fetchFavoriteOffersActions.rejected" with thunk "fetchFavoriteOffersAction"', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(400);

      await store.dispatch(fetchFavoriteOffersActions());
      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);

      expect(actionTypes).toEqual([
        fetchFavoriteOffersActions.pending.type,
        fetchFavoriteOffersActions.rejected.type,
      ]);
    });
  });
});

