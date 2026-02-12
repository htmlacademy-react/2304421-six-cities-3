import { OPTIONS } from '../../const';

type OptionsNames = typeof OPTIONS[number];

type PlacesOptionItemProps = {
  option: OptionsNames;
  isActive: boolean;
}

function PlacesOptionItem({option, isActive}: PlacesOptionItemProps): JSX.Element {
  return (
    <li className={`places__option ${isActive ? 'places__option--active' : ''}`} tabIndex={0}>
      {option}
    </li>
  );
}

export default PlacesOptionItem;
