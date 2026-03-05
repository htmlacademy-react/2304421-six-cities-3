import { SortOption } from '../../../types/options';

type PlacesOptionItemProps = {
  option: SortOption;
  isActive: boolean;
  onClick: () => void;
}

function PlacesOptionItem({option, isActive, onClick}: PlacesOptionItemProps): JSX.Element {
  return (
    <li className={`places__option ${isActive ? 'places__option--active' : ''}`} tabIndex={0} onClick={onClick}>
      {option}
    </li>
  );
}

export default PlacesOptionItem;
