import OffersCard from '../offers-card/offers-card';
import { Offer } from '../../types/offer';

type OffersListProps = {
  offers: Offer[];
  onHover?: (id: string | null) => void;
  onFavoriteToggleClick: (offerId: string, isFavorite: boolean) => void;
};

function OffersList({ offers, onHover, onFavoriteToggleClick }: OffersListProps): JSX.Element {

  return (
    <>
      {offers.map((offer) => (
        <OffersCard
          key={offer.id}
          variant="vertical"
          data={offer}
          onMouseEnter={() => onHover?.(offer.id)}
          onMouseLeave={() => onHover?.(null)}
          onClick={() => onFavoriteToggleClick(offer.id, offer.isFavorite)}
        />
      ))}
    </>
  );
}

export default OffersList;
