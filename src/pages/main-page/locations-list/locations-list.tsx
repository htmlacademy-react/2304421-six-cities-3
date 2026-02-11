import { CITIES } from '../../../const';
import LocationsItem from './locations-item';

function LocationsList(): JSX.Element {
  const activeCity = 'Amsterdam';

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => <LocationsItem key={city} city={city} isActive={city === activeCity}/>)}
      </ul>
    </section>
  );
}

export default LocationsList;
