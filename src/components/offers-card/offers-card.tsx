import { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { memo, useCallback } from 'react';
import { FavoriteParams } from '../../types/favorite';


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

type OffersCardProps = {
  variant: 'vertical' | 'horizontal';
  data: Offer;
  onHover?: (id: string | null) => void;
  onFavoriteClick: (params: FavoriteParams) => void;
};

function OffersCard({variant, data, onHover, onFavoriteClick}: OffersCardProps): JSX.Element {
  const normalizedRating = Math.min(Math.max(data.rating, 0), 5);
  const ratingWidth = `${Math.round(normalizedRating) * 20}%`;
  const { imageWidth, imageHeight, articleClass, imageWrapperClass } = CARD_CONFIG[variant];

  const handleMouseEnter = useCallback(() => {
    onHover?.(data.id);
  }, [onHover, data.id]);

  const handleMouseLeave = useCallback(() => {
    onHover?.(null);
  }, [onHover]);

  const handleClick = useCallback((evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    onFavoriteClick({
      id: data.id,
      isFavorite: data.isFavorite
    });
  }, [onFavoriteClick, data.id, data.isFavorite]);

  return (
    <article data-id={data.id} className={articleClass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {data.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={imageWrapperClass}>
        <Link to={AppRoute.Offer.replace(':id', data.id)}>
          <img
            className="place-card__image"
            src={data.previewImage}
            width={imageWidth}
            height={imageHeight}
            alt="Place image"
          />
        </Link>
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
            onClick={handleClick}
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
          <Link to={AppRoute.Offer.replace(':id', data.id)}>{data.title}</Link>
        </h2>
        <p className="place-card__type">{data.offerType}</p>
      </div>
    </article>
  );
}

const MemorizedOfferCard = memo(OffersCard);
export default MemorizedOfferCard;
