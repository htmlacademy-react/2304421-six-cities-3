import { render, screen } from '@testing-library/react';
import OffersList from './offers-list';
import { withHistory } from '../../utils/mock-component-with-history';
import { withStore } from '../../utils/mock-component-with-store';
import { mockOffer } from '../../mockTestData';
import { offerCardVersions } from '../../const';

describe('Component: OffersList', () => {
  it('should render correctly', () => {
    const firstOffer = {
      ...mockOffer,
      id: '1',
      title: 'First offer',
    };

    const secondOffer = {
      ...mockOffer,
      id: '2',
      title: 'Second offer',
    };

    const offers = [firstOffer, secondOffer];

    const { withStoreComponent } = withStore(
      <OffersList
        offers={offers}
        onHover={vi.fn()}
        onFavoriteToggleClick={vi.fn()}
        cardVersion={offerCardVersions.VERTICAL}
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

    expect(screen.getByText(firstOffer.title)).toBeInTheDocument();
    expect(screen.getByText(secondOffer.title)).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(2);
  });
});
