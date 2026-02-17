import { CITIES } from '../../../const';
import LocationsItem from './locations-item';

function LocationsList(): JSX.Element {
  const activeCity = 'Amsterdam';

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => <LocationsItem key={city.name} city={city} isActive={city.name === activeCity}/>)}
      </ul>
    </section>
  );
}

export default LocationsList;
