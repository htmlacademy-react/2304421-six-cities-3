import ReviewsItem from './reviews-item';
import { Comment } from '../../../types/comment';
import { MAX_REVIEWS } from '../../../const';
import { useMemo } from 'react';

type ReviewsListProps = {
  comments: Comment[];
};

function ReviewsList({ comments }: ReviewsListProps): JSX.Element {
  const visibleComments = useMemo(() => comments
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_REVIEWS), [comments]);

  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {visibleComments.map((comment) => (
          <ReviewsItem key={comment.id} review={comment} />
        ))}
      </ul>
    </>
  );
}

export default ReviewsList;
