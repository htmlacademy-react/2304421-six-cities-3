import OfferCard from '../offer-card/offer-card';
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
        <OfferCard
          key={offer.id}
          variant="vertical"
          data={offer}
          onHover={onHover}
          onFavoriteButtonClick={onFavoriteToggleClick}
        />
      ))}
    </>
  );
}

const OffersListMemo = memo(OffersList);
export default OffersListMemo;
