import OffersCard from '../offers-card/offers-card';
import { Offer } from '../../types/offer';
import { FavoriteParams } from '../../types/favorite';
import { memo } from 'react';

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
          onHover={onHover}
          onFavoriteClick={onFavoriteToggleClick}
        />
      ))}
    </>
  );
}

const OffersListMemo = memo(OffersList);
export default OffersListMemo;
