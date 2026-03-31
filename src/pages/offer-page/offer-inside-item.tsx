import { memo } from 'react';

type OfferInsideItemProps = {
  option: string;
}

function OfferInsideItem({option}: OfferInsideItemProps): JSX.Element {
  return (
    <li className="offer__inside-item">{option}</li>
  );
}

const OfferInsideItemMemo = memo(OfferInsideItem);
export default OfferInsideItemMemo;
