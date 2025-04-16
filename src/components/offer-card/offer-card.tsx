import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offer';
import { capitalize, getStarsWidth } from '../../utils';
import Bookmark from '../bookmark/bookmark';
import { memo } from 'react';

type OfferCardProps = Offer & {
  onMouseMove?: (id: number) => void;
  onMouseLeave?: () => void;
  place?: 'favorites' | 'cities' | 'near-places';
}

function OfferCard({
  title,
  type,
  previewImage,
  price,
  isPremium,
  isFavorite,
  rating,
  id,
  place = 'cities',
  onMouseMove = () => void 0,
  onMouseLeave = () => void 0
}: OfferCardProps): JSX.Element {
  const handleMouseMove = () => {
    onMouseMove(id);
  };

  return (
    <article
      className={`${(place === 'favorites') ? 'favorites__card' : `${place}__place-card`} place-card`}
      onMouseMove={handleMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${place}__image-wrapper place-card__image-wrapper`}>
        <a href="/">
          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt={title}
          />
        </a>
      </div>
      <div className={`${(place === 'favorites') ? 'favorites__card-info' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <Bookmark id={id} isActive={isFavorite} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getStarsWidth(rating) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
}

export default memo(OfferCard, (prevProps, nextProps) => prevProps.isFavorite === nextProps.isFavorite);
