import OffersCard from '../../components/offers-card/offers-card';
import { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';
import { City } from '../../types/city';
import { AppRoute } from '../../const';

type FavoritePageItemProps = {
  city: City;
  offers: Offer[];
}

function FavoritePageItem({city, offers}: FavoritePageItemProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoute.Root}>
            <span>{city.name}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((card) => <OffersCard key={card.id} variant='horizontal' data={card}/>)}
      </div>
    </li>
  );
}

export default FavoritePageItem;
