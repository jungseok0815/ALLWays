import React, { useState } from "react";
import MapContainer from "./Sections/MapContainer";
import "./LandingPage.css";

document.documentElement.style.height = "110%";
document.body.style.height = "110%";

const LandingPage = () => {
  const [searchPlace, setSearchPlace] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  const handleSearchPlace = (e) => {
    e.preventDefault();

    const results = []; // 검색 결과 받아오는 로직
    setSearchResults(results);
  };

  return (
    <div className="landing-page">
      <form className="search-form" onSubmit={handleSearchPlace}>
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
      <MapContainer
        searchPlace={searchPlace}
        searchResults={searchResults}
        userBookmarks={bookmarks}
        setUserBookmarks={setBookmarks}
      />
    </div>
  );
};

export default LandingPage;
