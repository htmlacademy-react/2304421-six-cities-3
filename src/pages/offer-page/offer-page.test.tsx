import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import OfferPage from './offer-page';
import { withStore } from '../../utils/mock-component-with-store';
import { AuthorizationStatus, AppRoute } from '../../const';
import { mockOfferDetails, mockOffer, mockComment } from '../../mockTestData';
import { HelmetProvider } from 'react-helmet-async';

vi.mock('./offer-image', () => ({
  default: () => <div>Offer image</div>,
}));

vi.mock('./offer-inside-item', () => ({
  default: ({ option }: { option: string }) => <li>{option}</li>,
}));

vi.mock('./offer-review-form', () => ({
  default: () => <div>Review form</div>,
}));

vi.mock('./reviews-list/reviews-list', () => ({
  default: () => <div>Reviews list</div>,
}));

vi.mock('../../components/map/map', () => ({
  default: () => <div>Map</div>,
}));

vi.mock('../../components/offers-list/offers-list', () => ({
  default: () => <div>Offers list</div>,
}));

vi.mock('../../hooks/useFavorite', () => ({
  useFavorite: () => vi.fn(),
}));

describe('Component: OfferPage', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <HelmetProvider>
        <MemoryRouter initialEntries={[`/offer/${mockOfferDetails.id}`]}>
          <Routes>
            <Route path={AppRoute.Offer} element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>,
      {
        currentOffer: {
          currentOffer: mockOfferDetails,
          isCurrentOfferLoading: false,
          isCurrentOfferNotFound: false,
        },
        nearbyOffers: {
          nearbyOffers: [mockOffer],
          isNearbyOffersLoading: false,
        },
        comments: {
          comments: [mockComment],
          isCommentsLoading: false,
          isPostingComment: false,
          postingComment: '',
          rating: null,
        },
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
          isLoginLoading: false,
          user: null,
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByText(mockOfferDetails.title)).toBeInTheDocument();
    expect(screen.getByText(mockOfferDetails.description)).toBeInTheDocument();
    expect(screen.getByText('What\'s inside')).toBeInTheDocument();
    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByText('Reviews list')).toBeInTheDocument();
    expect(screen.getByText('Map')).toBeInTheDocument();
    expect(screen.getByText('Offers list')).toBeInTheDocument();
  });
});
