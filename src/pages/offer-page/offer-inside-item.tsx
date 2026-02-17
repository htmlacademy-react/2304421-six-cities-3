import { OfferInsideItems } from '../../const';

type OfferInsideItemProps = {
  option: typeof OfferInsideItems[number];
}

function OfferInsideItem({option}: OfferInsideItemProps): JSX.Element {
  return (
    <li className="offer__inside-item">{option}</li>
  );
}

export default OfferInsideItem;
