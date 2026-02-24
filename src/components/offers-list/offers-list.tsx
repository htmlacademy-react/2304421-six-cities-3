import PlaceCard from '../place-card/place-card';
import { Offer } from '../../types/types';
import { useState } from 'react';

type OffersListProps = {
  offers: Offer[];
};

function OffersList({ offers }: OffersListProps): JSX.Element {

  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  void activeCardId;

  return (
    <>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          variant="vertical"
          data={offer}
          onMouseEnter={() => setActiveCardId(offer.id)}
          onMouseLeave={() => setActiveCardId(null)}
        />
      ))}
    </>
  );
}

export default OffersList;
