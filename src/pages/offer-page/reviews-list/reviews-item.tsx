import { Offer } from '../../../types/types';

type ReviewsItemProps = {
  offer: Offer;
  comment: string;
  date: string;
}

function ReviewsItem({offer, comment, date}: ReviewsItemProps): JSX.Element {

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src="img/avatar-max.jpg"
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">Max</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${offer.rating * 20}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>
          {date}
        </time>
      </div>
    </li>
  );
}

export default ReviewsItem;
