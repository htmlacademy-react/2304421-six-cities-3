import OffersSortingItem from './offers-sorting-item';
import { OPTIONS } from '../../../const';
import { SortOption } from '../../../types/options';
import './offers-sorting.css';
import { memo } from 'react';

type OffersSortingProps = {
  activeOption: SortOption;
  onOptionChange: (option: SortOption) => void;
  isOpen: boolean;
  onSortingToggle: () => void;
}

function OffersSorting({activeOption, onOptionChange, isOpen, onSortingToggle}: OffersSortingProps): JSX.Element {
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
          <OffersSortingItem
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

const OffersSortingMemo = memo(OffersSorting);
export default OffersSortingMemo;
