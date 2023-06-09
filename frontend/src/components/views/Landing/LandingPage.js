import React, { useState } from "react";
import MapContainer from "./Sections/MapContainer";
import "./LandingPage.css";

document.documentElement.style.height = "120%";
document.body.style.height = "120%";

const LandingPage = () => {
  const [searchPlace, setSearchPlace] = useState("");
  const [bookmarks, setBookmarks] = useState([]);

  const handleSearchPlace = (e) => {
    e.preventDefault();
    setSearchPlace(e.target.value);
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
        userBookmarks={bookmarks}
        setUserBookmarks={setBookmarks}
      />
    </div>
  );
};

export default LandingPage;