import PlaceCard from '../place-card/place-card';
import { Offer } from '../../types/types';

type OffersListProps = {
  offers: Offer[];
};

function OffersList({ offers }: OffersListProps): JSX.Element {
  return (
    <>
      {offers.map((offer) => (
        <PlaceCard key={offer.id} variant="vertical" data={offer} />
      ))}
    </>
  );
}

export default OffersList;
