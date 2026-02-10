import { cities } from '../../../const';

type LocationsItemProps = {
  city: string;
  isActive: boolean;
};

function LocationsItem({city, isActive}: LocationsItemProps): JSX.Element {
  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} href="#">
        <span>{city}</span>
      </a>
    </li>
  );
}

function LocationsList(): JSX.Element {
  const activeCity = 'Amsterdam';

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => <LocationsItem key={city} city={city} isActive={city === activeCity}/>)}
      </ul>
    </section>
  );
}

export default LocationsList;
