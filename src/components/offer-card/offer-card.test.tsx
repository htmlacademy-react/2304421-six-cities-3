import { render, screen } from '@testing-library/react';
import OfferCard from './offer-card';
import { withHistory } from '../../utils/mock-component-with-history';
import { withStore } from '../../utils/mock-component-with-store';
import { mockOffer } from '../../mockTestData';
import { offerCardVersions } from '../../const';

describe('Component: OfferCard', () => {
  it('should render correctly', () => {
    const onHover = vi.fn();
    const onFavoriteButtonClick = vi.fn();

    const { withStoreComponent } = withStore(
      <OfferCard
        variant={offerCardVersions.VERTICAL}
        data={mockOffer}
        onHover={onHover}
        onFavoriteButtonClick={onFavoriteButtonClick}
      />,
      {
        offers: {
          offersList: [],
          isOffersLoading: false,
          isOfferPostingToFavorite: false,
        },
      }
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByAltText('Place image')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
