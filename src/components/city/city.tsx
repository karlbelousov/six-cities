import { CityName } from '../../types/offer';

type CityProps = {
  name: CityName;
  isActive: boolean;
  onClick: (name: CityName) => void;
}

function City({name, isActive, onClick}: CityProps) {
  const handleClick = () => {
    onClick(name);
  };

  return (
    <li className="locations__item" onClick={handleClick}>
      <div className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} role='button' tabIndex={0}>
        <span>{name}</span>
      </div>
    </li>
  );
}

export default City;
