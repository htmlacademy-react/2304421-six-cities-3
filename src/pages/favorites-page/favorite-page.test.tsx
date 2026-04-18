import { render, screen } from '@testing-library/react';
import FavoritesPage from './favorites-page';
import { withHistory } from '../../utils/mock-component-with-history';
import { withStore } from '../../utils/mock-component-with-store';
import { mockCity, mockOffer } from '../../mockTestData';
import { AuthorizationStatus } from '../../const';

describe('Component: FavoritesPage', () => {
  it('should render empty state correctly', () => {
    const { withStoreComponent } = withStore(
      <FavoritesPage />,
      {
        favoriteOffers: {
          favorites: [],
          isFavoritesLoading: false,
        },
        offers: {
          offersList: [],
          isOffersLoading: false,
          isOfferPostingToFavorite: false,
        },
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
          isLoginLoading: false,
          user: null,
        },
      }
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(
      screen.getByText('Save properties to narrow down search or plan your future trips.')
    ).toBeInTheDocument();
  });

  it('should render favorites list correctly', () => {
    const firstOffer = {
      ...mockOffer,
      id: '1',
      title: 'First favorite offer',
      city: mockCity,
      isFavorite: true,
    };

    const secondOffer = {
      ...mockOffer,
      id: '2',
      title: 'Second favorite offer',
      city: mockCity,
      isFavorite: true,
    };

    const { withStoreComponent } = withStore(
      <FavoritesPage />,
      {
        favoriteOffers: {
          favorites: [firstOffer, secondOffer],
          isFavoritesLoading: false,
        },
        offers: {
          offersList: [],
          isOffersLoading: false,
          isOfferPostingToFavorite: false,
        },
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
          isLoginLoading: false,
          user: null,
        },
      }
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByText(mockCity.name)).toBeInTheDocument();
    expect(screen.getByText(firstOffer.title)).toBeInTheDocument();
    expect(screen.getByText(secondOffer.title)).toBeInTheDocument();
    expect(document.querySelectorAll('.place-card')).toHaveLength(2);
  });
});
