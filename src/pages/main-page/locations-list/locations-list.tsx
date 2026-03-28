import { CITIES } from '../../../const';
import LocationsItem from './locations-item';
import { City } from '../../../types/city';
import { memo } from 'react';

type LocationListProps = {
  currentCity: City;
  onCityChange: (city: City) => void;
};

function LocationsList({currentCity, onCityChange,}: LocationListProps): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => (
          <LocationsItem
            key={city.name}
            city={city}
            isActive={city.name === currentCity.name}
            onClick={onCityChange}
          />
        ))}
      </ul>
    </section>
  );
}
const LocationsListMemo = memo(LocationsList);
export default LocationsListMemo;
