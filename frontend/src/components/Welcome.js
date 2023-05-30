

import React, { useState, useEffect } from 'react';
import LandingPage from '../components/views/Landing/LandingPage';
import MapContainer from '../components/views/Landing/Sections/MapContainer';
import MyPage from '../components/views/Landing/Sections/MyPage';
import './Welcome.css';

function Welcome() {
  const [searchPlace, setSearchPlace] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [currentPage, setCurrentPage] = useState('landing');

  const handleSearchPlace = (e) => {
    setSearchPlace(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchHistory([...searchHistory, searchPlace]);
    setSearchResult(searchPlace);
    setSearchPlace('');
    setCurrentPage('map'); // Change current page to 'map' after submitting the search
  };

  const handleGoToMyPage = () => {
    setCurrentPage('mypage');
  };

  const handleGoToHomePage = () => {
    setCurrentPage('landing');
    window.location = '/'; // Navigate back to the homepage using window.location
  };


  useEffect(() => {
    if (currentPage === 'mypage') {
      localStorage.setItem('bookmarks', JSON.stringify(searchResult));
    }
  }, [currentPage, searchResult]);

  let renderedContent;

  if (currentPage === 'landing') {
    renderedContent = (
      <LandingPage onSubmit={handleSubmit} onInputChange={handleSearchPlace} searchPlace={searchPlace} />
    );
  } else if (currentPage === 'map') {
    renderedContent = (
      <MapContainer searchPlace={searchResult} onGoToMyPage={handleGoToMyPage} />
    );
  } else {
    renderedContent = <MyPage />;
    // Add your custom component or logic for the 'mypage' page
    renderedContent = <h1>My Page Content</h1>;
  }

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   axios
  //     .post("http://localhost:8080/api/logout", {
  //       id: id,
  //     })
  //     .then((response) => {
  //       alert(response.data.message);
  //       navigate("/loginform");
  //     })
  //     .catch((error) => {
  //       alert(error.response.data.message);
  //       console.log(error);
  //     });
  // };

  return (
    <div>


      <nav className="navbar">
        <div className="navbar-left">
          <a href="/" className="logo-link" onClick={handleGoToHomePage}>
            <img src="./Allways.png" alt="Allways Logo" className="logo" />
            <span className="site-name" onClick={handleGoToHomePage}>
              Allways
            </span>
          </a>
        </div>
        <div className="navbar-right">
          <a href="/mypage" className="mypage-link" onClick={handleGoToMyPage}>
            마이페이지
          </a>
        </div>
      </nav>
      {renderedContent}
      <div>
        <h3>검색 기록:</h3>
        <ul>
        {searchHistory.map((search, index) => (
            <li key={index}>{search}</li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default Welcome;
