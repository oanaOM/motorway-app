import React, { useState } from 'react';
import { fetcher } from '../../utils/swr';
import useSWR, { SWRResponse } from 'swr';
import { useAppContextDispatch } from '../AppContextProvider';
import '../../styles/searchbar.scss';
import SearchSVG from '../../assets/icons/search.svg';
import CloseSVG from '../../assets/icons/close.svg';
import ArrowDownSVG from '../../assets/icons/arrowDown.svg';

const SearchBar: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const dispatch = useAppContextDispatch();

  const { data: allTags }: SWRResponse<string[], Error> = useSWR('http://localhost:8000/api/tags', fetcher);
  const { data: matchingTags, isLoading }: SWRResponse<string[], Error> = useSWR(
    searchInput ? `http://localhost:8000/api/tags?tag=${searchInput}` : null,
    fetcher
  );

  const handleSearch = (e) => {
    e.preventDefault();

    setSearchInput(e.target.value);
    setTags(matchingTags);
  };

  const handleSelect = (newTag: string) => {
    dispatch({
      type: 'UPDATE_TAGS',
      tag: newTag,
    });
    setSearchInput('');
    setTags([]);
  };

  const displayDropdown = searchInput.length > 0 || tags.length > 0 ? 'block' : 'none';
  const showClearButton = (tags && tags.length > 0) || searchInput.length > 0;

  function handleOnClear(e) {
    e.preventDefault();
    setSearchInput('');
    setTags([]);
  }

  function handleShowAllTags(e) {
    e.preventDefault();
    setTags(allTags);
  }

  return (
    <div className="search-container">
      <div className="search-input">
        <img src={SearchSVG} width="24" height="24" />
        <input
          type="text"
          role="input"
          placeholder="Search for vehicles"
          value={searchInput}
          onChange={handleSearch}
          data-testid="search-input"
        />
        {showClearButton && (
          <button onClick={handleOnClear}>
            <img src={CloseSVG} width="18" height="18" />
          </button>
        )}

        {searchInput.length === 0 && tags.length === 0 && (
          <button onClick={handleShowAllTags} role="button" data-testid="show-all-tags">
            <img src={ArrowDownSVG} width="18" height="18" />
          </button>
        )}
      </div>

      <ul data-testid="cars-select" style={{ display: displayDropdown }}>
        {isLoading ? (
          <div>Loading</div>
        ) : tags && tags.length === 0 ? (
          <li>No car found.</li>
        ) : (
          tags &&
          tags.map((tag, index) => (
            <li key={index}>
              <button key={index} onClick={() => handleSelect(tag)} data-testid={tag}>
                {tag.replaceAll('-', ' ').charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SearchBar;
