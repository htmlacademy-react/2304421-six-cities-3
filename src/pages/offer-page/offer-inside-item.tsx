type OfferInsideItemProps = {
  option: string;
}

function OfferInsideItem({option}: OfferInsideItemProps): JSX.Element {
  return (
    <li className="offer__inside-item">{option}</li>
  );
}

export default OfferInsideItem;
