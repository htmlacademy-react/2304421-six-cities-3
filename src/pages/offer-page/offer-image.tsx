import { OfferImages } from '../../const';

type OfferImageProps = {
  img: typeof OfferImages[number];
  alt?: string;
}

function OfferImage({img, alt}: OfferImageProps): JSX.Element {
  return (
    <div className="offer__image-wrapper">
      <img className="offer__image" src={img} alt={alt ?? 'Photo studio'} />
    </div>
  );
}

export default OfferImage;
