import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offer';
import { FavoriteParams } from '../../types/favorite';
import { memo } from 'react';
import { offerCardVersions } from '../../const';

type OffersListProps = {
  offers: Offer[];
  onHover?: (id: string | null) => void;
  onFavoriteToggleClick: ({id, isFavorite }: FavoriteParams) => void;
  cardVersion: offerCardVersions;
};

function OffersList({ offers, onHover, onFavoriteToggleClick, cardVersion }: OffersListProps): JSX.Element {

  return (
    <>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          variant={cardVersion}
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
