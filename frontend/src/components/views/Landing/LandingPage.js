import React, { useState } from 'react';
import MapContainer from './Sections/MapContainer';

const LandingPage = () => {
  const [searchPlace, setSearchPlace] = useState('');
  const [bookmarks, setBookmarks] = useState([]);

  const handleSearchPlace = (e) => {
    e.preventDefault();
    setSearchPlace(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSearchPlace} className="search-form">
        <input
          className="search-input"
          type="text"
          placeholder="장소 검색"
          value={searchPlace}
          onChange={(e) => setSearchPlace(e.target.value)}
        />
        <button type="submit" className="search-button">
          검색
        </button>
      </form>
      <MapContainer searchPlace={searchPlace} userBookmarks={bookmarks} setUserBookmarks={setBookmarks} />
    </div>
  );
};

export default LandingPage;
