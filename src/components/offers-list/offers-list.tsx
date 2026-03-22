import OffersCard from '../offers-card/offers-card';
import { Offer } from '../../types/offer';
import { FavoriteParams } from '../../types/favorite';

type OffersListProps = {
  offers: Offer[];
  onHover?: (id: string | null) => void;
  onFavoriteToggleClick: ({id, isFavorite }: FavoriteParams) => void;
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
          onClick={() => onFavoriteToggleClick({id: offer.id, isFavorite: offer.isFavorite})}
        />
      ))}
    </>
  );
}

export default OffersList;
