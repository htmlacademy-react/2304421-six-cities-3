import { Offer } from '../../types/types';

const CARD_CONFIG = {
  vertical: {
    imageHeight: 200,
    imageWidth: 260,
    articleClass: 'cities__card place-card',
    imageWrapperClass: 'cities__image-wrapper place-card__image-wrapper',
  },
  horizontal: {
    imageWidth: 150,
    imageHeight: 110,
    articleClass: 'favorites__card place-card',
    imageWrapperClass: 'favorites__image-wrapper place-card__image-wrapper',
  },
} as const;

type PlaceCardProps = {
variant: 'vertical' | 'horizontal';
data: Offer;
}

function PlaceCard({variant, data}: PlaceCardProps): JSX.Element {
  const normalizedRating = Math.min(Math.max(data.rating, 0), 5);
  const ratingWidth = `${Math.round(normalizedRating) * 20}%`;
  const { imageWidth, imageHeight, articleClass, imageWrapperClass } = CARD_CONFIG[variant];

  return (
    <article data-id={data.id} className={articleClass}>
      {data.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={imageWrapperClass}>
        <a href="#">
          <img
            className="place-card__image"
            src={data.previewImage}
            width={imageWidth}
            height={imageHeight}
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{data.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${data.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingWidth }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{data.title}</a>
        </h2>
        <p className="place-card__type">{data.offerType}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
