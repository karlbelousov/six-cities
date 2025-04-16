import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH, STARS_COUNT, SubmitStatus } from '../../const';
import { ReviewAuth } from '../../types/review';

type ReviewFormProps = {
  onFormSubmit: (formData: Omit<ReviewAuth, 'id'>) => void;
  submitStatus: SubmitStatus;
}

function ReviewForm({onFormSubmit, submitStatus}: ReviewFormProps) {
  const [text, setText] = useState('');
  const [rating, setRating] = useState<number>(0);
  const isSubmiting = submitStatus === SubmitStatus.Pending;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onFormSubmit({
      comment: text,
      rating
    });
  };


  useEffect(() => {
    if (submitStatus === SubmitStatus.Fullfilled) {
      setText('');
      setRating(0);
    }

  }, [submitStatus]);

  return (
    <form className="reviews__form form" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Array.from({ length: STARS_COUNT }, (_, i) => (
          <Fragment key={`Star ${STARS_COUNT - i}`}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={STARS_COUNT - i}
              id={`${STARS_COUNT - i}-stars`}
              type="radio"
              checked={rating === STARS_COUNT - i}
              onChange={handleInputChange}
            />
            <label
              htmlFor={`${STARS_COUNT - i}-stars`}
              className="reviews__rating-label form__rating-label"
              title="perfect"
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
        value={text}
        onChange={handleTextareaChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{''}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          disabled={isSubmiting || !rating || (text.length < MIN_COMMENT_LENGTH || text.length > MAX_COMMENT_LENGTH)}
          className="reviews__submit form__submit button"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
