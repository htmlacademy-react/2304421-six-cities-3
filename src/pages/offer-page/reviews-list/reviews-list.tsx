import { mockComments } from '../../../mocks/mockComments';
import { getRandomCards } from '../../../utils/utils';
import { getRandomUniqueInteger } from '../../../utils/utils';
import ReviewsItem from './reviews-item';
import { Offer } from '../../../types/types';

type ReviewsList = {
  offer: Offer;
};

function ReviewsList({ offer }: ReviewsList): JSX.Element {
  const reviewDate = '2019-04-24';
  const commentsCount = getRandomUniqueInteger(1, mockComments.length);
  const currentComments = getRandomCards(mockComments, commentsCount);

  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{commentsCount}</span>
      </h2>
      <ul className="reviews__list">
        {currentComments.map((comment) => (
          <ReviewsItem
            key={comment}
            offer={offer}
            comment={comment}
            date={reviewDate}
          />
        ))}
      </ul>
    </>
  );
}

export default ReviewsList;
