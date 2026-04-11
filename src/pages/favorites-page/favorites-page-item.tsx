import OfferCard from '../../components/offer-card/offer-card';
import { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';
import { City } from '../../types/city';
import { AppRoute } from '../../const';
import { FavoriteParams } from '../../types/favorite';

type FavoritePageItemProps = {
  city: City;
  offers: Offer[];
  onFavoriteToggleClick: ({id, isFavorite}: FavoriteParams) => void;
}

function FavoritesPageItem({city, offers, onFavoriteToggleClick}: FavoritePageItemProps): JSX.Element {
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
        {offers.map((card) => <OfferCard key={card.id} variant='horizontal' data={card} onFavoriteButtonClick={onFavoriteToggleClick} />)}
      </div>
    </li>
  );
}

export default FavoritesPageItem;
