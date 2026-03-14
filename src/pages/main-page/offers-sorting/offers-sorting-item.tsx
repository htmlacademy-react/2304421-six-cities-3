import { SortOption } from '../../../types/options';

type OffersSortingItemProps = {
  option: SortOption;
  isActive: boolean;
  onClick: () => void;
}

function OffersSortingItem({option, isActive, onClick}: OffersSortingItemProps): JSX.Element {
  return (
    <li className={`places__option ${isActive ? 'places__option--active' : ''}`} tabIndex={0} onClick={onClick}>
      {option}
    </li>
  );
}

export default OffersSortingItem;
