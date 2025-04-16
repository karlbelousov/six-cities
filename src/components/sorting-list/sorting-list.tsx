import { useState } from 'react';
import { Sorting } from '../../const';
import { SortName } from '../../types/types';

type SortingListProps = {
  onChange: (name: SortName) => void;
  activeSorting: SortName;
}

function SortingList({onChange, activeSorting}: SortingListProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleToggleButtonClick = () => {
    setIsOpened(!isOpened);
  };

  const handlleSortItemClick = (name: SortName) => {
    setIsOpened(false);
    onChange(name);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleToggleButtonClick}
      >
        {Sorting[activeSorting]}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      {isOpened && (
        <ul className="places__options places__options--custom places__options--opened">
          {(Object.entries(Sorting) as [SortName, Sorting][]).map(([name, title]) => (
            <li
              key={name}
              className="places__option"
              onClick={() => handlleSortItemClick(name)}
              tabIndex={0}
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default SortingList;
