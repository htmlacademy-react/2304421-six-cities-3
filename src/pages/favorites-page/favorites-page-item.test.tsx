import { render, screen } from '@testing-library/react';
import FavoritesPageItem from './favorites-page-item';
import { withHistory } from '../../utils/mock-component-with-history';
import { withStore } from '../../utils/mock-component-with-store';
import { mockCity, mockOffer } from '../../mockTestData';

describe('Component: FavoritePageItem', () => {
  it('should render correctly', () => {
    const firstOffer = {
      ...mockOffer,
      id: '1',
      title: 'First favorite offer',
      city: mockCity
    };
    const secondOffer = {
      ...mockOffer,
      id: '2',
      title: 'Second favorite offer',
      city: mockCity
    };

    const { withStoreComponent } = withStore(
      <FavoritesPageItem
        city={mockCity}
        offers={[firstOffer, secondOffer]}
        onFavoriteToggleClick={vi.fn()}
      />,
      {
        offers: {
          offersList: [],
          isOffersLoading: false,
          isOfferPostingToFavorite: false,
        }
      }
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(mockCity.name)).toBeInTheDocument();
    expect(screen.getByText(firstOffer.title)).toBeInTheDocument();
    expect(screen.getByText(secondOffer.title)).toBeInTheDocument();
    expect(document.querySelectorAll('.place-card')).toHaveLength(2);
  });
});
