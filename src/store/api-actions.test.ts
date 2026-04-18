import { createAPI } from '../services/api';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../types/state';
import { APIRoute, AuthorizationStatus } from '../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { extractActionsTypes, mockOffer, mockCity, mockOfferDetails, mockComment, mockUser } from '../mockTestData';
import { fetchFavoriteOffersActions, fetchOffersAction, fetchOfferByIdAction, fetchNearbyOffersAction, fetchCommentsAction, postCommentAction, postFavoriteAction, checkAuthAction, loginAction, logoutAction } from './api-actions';
import MockAdapter from 'axios-mock-adapter';
import { AppThunkDispatch } from '../types/app-thunk-dispatch';
import { mockAuthData } from '../mockTestData';
import * as tokenStorage from '../services/token';

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

  describe('fetchOfferByIdAction', () => {
    it('should dispatch "fetchOfferByIdAction.pending" and "fetchOfferByIdAction.fulfilled" with thunk "fetchOfferByIdAction"', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOfferDetails.id}`).reply(200, mockOfferDetails);

      await store.dispatch(fetchOfferByIdAction(mockOfferDetails.id));
      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);

      expect(actionTypes).toEqual([
        fetchOfferByIdAction.pending.type,
        fetchOfferByIdAction.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchOfferByIdAction.pending" and "fetchOfferByIdAction.rejected" with thunk "fetchOfferByIdAction"', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOfferDetails.id}`).reply(400);

      await store.dispatch(fetchOfferByIdAction(mockOfferDetails.id));
      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);

      expect(actionTypes).toEqual([
        fetchOfferByIdAction.pending.type,
        fetchOfferByIdAction.rejected.type,
      ]);
    });
  });

  describe('fetchNearbyOffersAction', () => {
    it('should dispatch "fetchNearbyOffersAction.pending" and "fetchNearbyOffersAction.fulfilled" with thunk "fetchNearbyOffersAction"', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOfferDetails.id}/nearby`).reply(200, [mockOffer]);

      await store.dispatch(fetchNearbyOffersAction(mockOfferDetails.id));
      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);

      expect(actionTypes).toEqual([
        fetchNearbyOffersAction.pending.type,
        fetchNearbyOffersAction.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchNearbyOffersAction.pending" and "fetchNearbyOffersAction.rejected" with thunk "fetchNearbyOffersAction"', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOfferDetails.id}/nearby`).reply(400);

      await store.dispatch(fetchNearbyOffersAction(mockOfferDetails.id));
      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);

      expect(actionTypes).toEqual([
        fetchNearbyOffersAction.pending.type,
        fetchNearbyOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchCommentsAction', () => {
    it('should dispatch "fetchCommentsAction.pending" and "fetchCommentsAction.fulfilled" with thunk "fetchCommentsAction"', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${mockOfferDetails.id}`).reply(200, [mockComment]);

      await store.dispatch(fetchCommentsAction(mockOfferDetails.id));
      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);

      expect(actionTypes).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchCommentsAction.pending" and "fetchCommentsAction.rejected" with thunk "fetchCommentsAction"', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${mockOfferDetails.id}`).reply(400);

      await store.dispatch(fetchCommentsAction(mockOfferDetails.id));
      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);

      expect(actionTypes).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.rejected.type,
      ]);
    });
  });

  describe('postCommentAction', () => {
    it('should dispatch "postCommentAction.pending" and "postCommentAction.fulfilled" with "postCommentAction"', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${mockOfferDetails.id}`).reply(200);

      await store.dispatch(postCommentAction({offerId: mockOfferDetails.id, rating: mockComment.rating, comment: mockComment.comment}));
      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);

      expect(actionTypes).toEqual([
        postCommentAction.pending.type,
        fetchCommentsAction.pending.type,
        postCommentAction.fulfilled.type,
      ]);
    });

    it('should dispatch "postCommentAction.pending" and "postCommentAction.rejected" with "postCommentAction"', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${mockOfferDetails.id}`).reply(400);

      await store.dispatch(postCommentAction({offerId: mockOfferDetails.id, rating: mockComment.rating, comment: mockComment.comment}));
      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);

      expect(actionTypes).toEqual([
        postCommentAction.pending.type,
        postCommentAction.rejected.type,
      ]);
    });
  });

  describe('postFavoriteAction', () => {
    it('should dispatch "postFavoriteAction.pending" and "postFavoriteAction.fulfilled" with "postFavoriteAction"', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Favorites}/${mockOffer.id}/1`).reply(200, mockOffer);

      await store.dispatch(postFavoriteAction({offerId: mockOffer.id, status: 1}));
      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);

      expect(actionTypes).toEqual([
        postFavoriteAction.pending.type,
        postFavoriteAction.fulfilled.type,
      ]);
    });

    it('should dispatch "postFavoriteAction.pending" and "postFavoriteAction.rejected" with expected payload', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Favorites}/${mockOffer.id}/1`).reply(400);

      await store.dispatch(postFavoriteAction({offerId: mockOffer.id, status: 1}));
      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);
      const rejectedAction = actions[1] as ReturnType<typeof postFavoriteAction.rejected>;

      expect(actionTypes).toEqual([
        postFavoriteAction.pending.type,
        postFavoriteAction.rejected.type,
      ]);
      expect(rejectedAction.payload).toBe('Failed to add/remove the offer to/from favorite');
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk checkAuthAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, mockUser);

      await store.dispatch(checkAuthAction());
      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);

      expect(actionTypes).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" with thunk checkAuthAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);

      expect(actionTypes).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending" and "loginAction.fulfilled" with "loginAction"', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login, {email: mockAuthData.login, password: mockAuthData.password}).reply(200, mockUser);

      await store.dispatch(loginAction({login: mockAuthData.login, password: mockAuthData.password}));
      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);

      expect(actionTypes).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should dispatch "loginAction.pending" and "loginAction.rejected" with expected payload', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login, {email: mockAuthData.login, password: mockAuthData.password}).reply(400);

      await store.dispatch(loginAction({login: mockAuthData.login, password: mockAuthData.password}));
      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);
      const rejectedAction = actions[1] as ReturnType<typeof loginAction.rejected>;

      expect(actionTypes).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type,
      ]);
      expect(rejectedAction.payload).toBe('Failed to login, try one more time');
    });

    it('should call "saveToken" once with the received token', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, mockUser);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(mockAuthData));

      expect(mockSaveToken).toHaveBeenCalledTimes(1);
      expect(mockSaveToken).toHaveBeenCalledWith(mockUser.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled" with logoutAction thunk', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(200);

      await store.dispatch(logoutAction());
      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);

      expect(actionTypes).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should dispatch "logoutAction.pending" and "logoutAction.rejected" with logoutAction thunk', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(400);

      await store.dispatch(logoutAction());
      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);

      expect(actionTypes).toEqual([
        logoutAction.pending.type,
        logoutAction.rejected.type,
      ]);
    });

    it('should call "dropToken" once with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(200);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toHaveBeenCalledTimes(1);
    });
  });
});
