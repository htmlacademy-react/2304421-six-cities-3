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

export default LocationsItem;
