import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { RATING } from '../../const';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postCommentAction } from '../../store/api-actions';
import { setError } from '../../store/slice';

type FormDataType = {
  rating: number | null;
  comment: string;
};

function OfferReviewForm(): JSX.Element {
  const { id } = useParams<{id: string }>();
  const dispatch = useAppDispatch();
  const isSending = useAppSelector((store) => store.app.isCommentsLoading);

  const [formData, setFormData] = useState<FormDataType>({
    rating: null,
    comment: '',
  });

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, rating: Number(evt.target.value) });
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, comment: evt.target.value });
  };

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!id || formData.rating === null) {
      return;
    }

    try {
      await dispatch(postCommentAction({
        offerId: id,
        comment: formData.comment,
        rating: formData.rating,
      }));

      setFormData({
        rating: null,
        comment: '',
      });
    } catch {
      dispatch(setError('Failed to post comment'));
    }
  };

  const isDisabled =
    isSending ||
    formData.rating === null ||
    formData.comment.length < 50 ||
    formData.comment.length > 300;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(evt) => void handleSubmit(evt)}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATING.map(({value, label}) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-star`}
              type="radio"
              checked={formData.rating === value}
              onChange={handleRatingChange}
              disabled={isSending}
            />
            <label
              htmlFor={`${value}-star`}
              className="reviews__rating-label form__rating-label"
              title={label}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={handleCommentChange}
        disabled={isSending}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isDisabled}
        >
          {isSending ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default OfferReviewForm;
