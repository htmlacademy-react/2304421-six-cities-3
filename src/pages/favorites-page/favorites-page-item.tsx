import PlaceCard from '../../components/place-card/place-card';
import { Offer } from '../../types/types';
import { Link } from 'react-router-dom';
import { City } from '../../types/types';

type FavoritePageItemProps = {
  city: City;
  offers: Offer[];
}

function FavoritePageItem({city, offers}: FavoritePageItemProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to="#">
            <span>{city.name}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((card) => <PlaceCard key={card.id} variant='horizontal' data={card}/>)}
      </div>
    </li>
  );
}

export default FavoritePageItem;
