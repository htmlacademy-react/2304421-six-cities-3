import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus } from '../../const';
import App from './app';
import { withHistory } from '../../utils/mock-component-with-history';
import { withStore } from '../../utils/mock-component-with-store';
import { Outlet } from 'react-router-dom';

vi.mock('../../pages/main-page/main-page', () => ({
  default: () => <div>Main page</div>,
}));

vi.mock('../../pages/login-page/login-page', () => ({
  default: () => <div>Login page</div>,
}));

vi.mock('../../pages/favorites-page/favorites-page', () => ({
  default: () => <div>Favorites page</div>,
}));

vi.mock('../../pages/offer-page/offer-page', () => ({
  default: () => <div>Offer page</div>,
}));

vi.mock('../not-found-page/not-found-page', () => ({
  default: () => <div>Not found page</div>,
}));

vi.mock('../layout/layout', () => ({
  default: () => <div>Layout<Outlet /></div>,
}));

describe('Application Routing', () => {
  it('should render "MainPage" when user navigates to "/"', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Root);

    const { withStoreComponent } = withStore(<App />, {
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        isLoginLoading: false,
        user: null,
      },
      favoriteOffers: {
        favorites: [],
        isFavoritesLoading: false,
      }
    });

    const preparedComponent = withHistory(withStoreComponent, history);

    render(preparedComponent);

    expect(screen.getByText('Main page')).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigates to "/login"', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Login);

    const { withStoreComponent } = withStore(<App />, {
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        isLoginLoading: false,
        user: null,
      },
      favoriteOffers: {
        favorites: [],
        isFavoritesLoading: false,
      }
    });

    const preparedComponent = withHistory(withStoreComponent, history);

    render(preparedComponent);

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when user navigates to "/favorites"', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Favorites);

    const { withStoreComponent } = withStore(<App />, {
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        isLoginLoading: false,
        user: null,
      },
      favoriteOffers: {
        favorites: [],
        isFavoritesLoading: false,
      }
    });

    const preparedComponent = withHistory(withStoreComponent, history);

    render(preparedComponent);

    expect(screen.getByText('Favorites page')).toBeInTheDocument();
  });

  it('should render "OfferPage" when user navigates to "/offer/:id"', () => {
    const history = createMemoryHistory();
    history.push('/offer/1');

    const { withStoreComponent } = withStore(<App />, {
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        isLoginLoading: false,
        user: null,
      },
      favoriteOffers: {
        favorites: [],
        isFavoritesLoading: false,
      }
    });

    const preparedComponent = withHistory(withStoreComponent, history);

    render(preparedComponent);

    expect(screen.getByText('Offer page')).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigates to unknown route', () => {
    const history = createMemoryHistory();
    history.push('/unknown-route');

    const { withStoreComponent } = withStore(<App />, {
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        isLoginLoading: false,
        user: null,
      },
      favoriteOffers: {
        favorites: [],
        isFavoritesLoading: false,
      }
    });

    const preparedComponent = withHistory(withStoreComponent, history);

    render(preparedComponent);

    expect(screen.getByText('Not found page')).toBeInTheDocument();
  });
});
