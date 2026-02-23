import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { RATING } from '../../const';

type FormDataType = {
  rating: number | null;
  comment: string;
};

function OfferReviewForm(): JSX.Element {
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

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
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
          disabled={formData.rating === null || formData.comment.length < 50}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default OfferReviewForm;
