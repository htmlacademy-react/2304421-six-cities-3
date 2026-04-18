import { withStore } from '../../utils/mock-component-with-store';
import { withHistory } from '../../utils/mock-component-with-history';
import { mockCity, mockOffer } from '../../mockTestData';
import { AuthorizationStatus } from '../../const';
import { render, screen } from '@testing-library/react';
import MainPage from './main-page';


vi.mock('./locations-list/locations-list', () => ({
  default: () => <div>Locations list</div>,
}));

vi.mock('../../components/offers-list/offers-list', () => ({
  default: () => <div>Offers list</div>,
}));

vi.mock('../../components/map/map', () => ({
  default: () => <div>Map</div>,
}));

vi.mock('./offers-sorting/offers-sorting', () => ({
  default: () => <div>Offers sorting</div>,
}));

vi.mock('../../hooks/useFavorite', () => ({
  useFavorite: () => vi.fn(),
}));

describe('Component: MainPage', () => {
  it('should render correctly', () => {
    const preparedOffer = {
      ...mockOffer,
      city: mockCity,
    };
    const { withStoreComponent } = withStore(
      <MainPage />,
      {
        offers: {
          offersList: [preparedOffer],
          isOffersLoading: false,
          isOfferPostingToFavorite: false,
        },
        city: {
          city: mockCity,
        },
        user: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          isLoginLoading: false,
          user: null,
        },
        error: {
          error: null,
        },
      }
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Locations list')).toBeInTheDocument();
    expect(screen.getByText('Offers sorting')).toBeInTheDocument();
    expect(screen.getByText('Offers list')).toBeInTheDocument();
    expect(screen.getByText('Map')).toBeInTheDocument();
    expect(
      screen.getByText(`1 place to stay in ${mockCity.name}`)
    ).toBeInTheDocument();
  });
});
