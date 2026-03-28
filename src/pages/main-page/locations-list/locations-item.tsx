import { Link } from 'react-router-dom';
import { City } from '../../../types/city';
import { memo } from 'react';

type LocationsItemProps = {
  city: City;
  isActive: boolean;
  onClick: (city: City) => void;
};

function LocationsItem({city, isActive, onClick,}: LocationsItemProps): JSX.Element {
  const handleClick = () => {
    onClick(city);
  };
  return (
    <li className="locations__item">
      <Link
        className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}
        to="#"
        onClick={(evt) => {
          evt.preventDefault();
          handleClick();
        }}
      >
        <span>{city.name}</span>
      </Link>
    </li>
  );
}

const LocationsItemMemo = memo(LocationsItem);
export default LocationsItemMemo;
