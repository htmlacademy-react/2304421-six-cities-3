import { Link } from 'react-router-dom';
import { City } from '../../../types/types';

type LocationsItemProps = {
  city: City;
  isActive: boolean;
};

function LocationsItem({city, isActive}: LocationsItemProps): JSX.Element {
  return (
    <li className="locations__item">
      <Link className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} to="#">
        <span>{city.name}</span>
      </Link>
    </li>
  );
}

export default LocationsItem;
