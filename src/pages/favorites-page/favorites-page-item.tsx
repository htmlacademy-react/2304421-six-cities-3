import PlaceCard from '../../components/place-card/place-card';
import { Offer } from '../../types/offer';
import { cities } from '../../const';

type CityName = typeof cities[number];

type FavoritePageItemProps = {
  city: CityName;
  offers: Offer[];
}

function FavoritePageItem({city, offers}: FavoritePageItemProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((card) => <PlaceCard key={card.id} variant='horizontal' data={card}/>)}
      </div>
    </li>
  );
}

export default FavoritePageItem;
