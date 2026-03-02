import { Link } from 'react-router-dom';
import { City } from '../../../types/types';

type LocationsItemProps = {
  city: City;
  isActive: boolean;
  onClick: () => void;
};

function LocationsItem({city, isActive, onClick,}: LocationsItemProps): JSX.Element {
  return (
    <li className="locations__item">
      <Link
        className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}
        to="#"
        onClick={(evt) => {
          evt.preventDefault();
          onClick();
        }}
      >
        <span>{city.name}</span>
      </Link>
    </li>
  );
}

export default LocationsItem;
