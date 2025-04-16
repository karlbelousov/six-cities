import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postFavorite } from '../../store/action';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { Offer } from '../../types/offer';

type BookmarkProps = {
  id: Offer['id'];
  isActive: boolean;
  place?: 'place-card' | 'property';
}

function Bookmark({id, isActive, place = 'place-card'}: BookmarkProps) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    dispatch(postFavorite({
      id,
      status: isActive ? 0 : 1
    }));
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`${place}__bookmark-button button${isActive && authorizationStatus === AuthorizationStatus.Auth ? ` ${place}__bookmark-button--active` : ''
      }`}
      type="button"
    >
      <svg className="place-card__bookmark-icon" width={place === 'property' ? 31 : 18} height={place === 'property' ? 33 : 19}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isActive ? 'From' : 'To'} bookmarks</span>
    </button>
  );
}

export default Bookmark;
