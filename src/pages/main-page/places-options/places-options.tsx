import PlacesOptionItem from './places-option-item';
import { OPTIONS } from '../../../const';
import { SortOption } from '../../../types/options';
import './places-options.css';

type PlacesOptionsProps = {
  activeOption: SortOption;
  onOptionChange: (option: SortOption) => void;
  isOpen: boolean;
  onSortingToggle: () => void;
}

function PlacesOptions({activeOption, onOptionChange, isOpen, onSortingToggle}: PlacesOptionsProps): JSX.Element {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <button type="button" className="places__sorting-type" onClick={onSortingToggle}>
        {activeOption}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </button>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {OPTIONS.map((option) => (
          <PlacesOptionItem
            key={option}
            option={option}
            isActive={option === activeOption}
            onClick={() => onOptionChange(option)}
          />
        ))}
      </ul>
    </form>
  );
}

export default PlacesOptions;
