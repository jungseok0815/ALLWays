import React, { useState } from 'react';
import Logout from './Logout';
import Menu from './Menu';
import './App.css';
import { Link } from 'react-router-dom';

import bookmarkImg from "./bookmark.png";
import unbookmarkImg from "./unbookmark.png";

function App() {
  const [글제목, set글제목] = useState(['스타벅스', '교촌치킨', '한세대학교']);
  const [북마크, set북마크] = useState([true, true, true]); // 초기 북마크 상태

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // login page로 이동해야 함
  function handleLogin() {
    setIsLoggedIn(true);
  }

  // logout page (회원가입, 로그인 페이지로 이동해야 함)
  function handleLogout() {
    setIsLoggedIn(false);
  }

  function handleNavigate(path) {
    console.log(`이동: ${path}`);
  }

  // 북마크 토글 함수
  function toggleBookmark(index) {
    const updated북마크 = [...북마크];
    updated북마크[index] = !updated북마크[index];
    set북마크(updated북마크);

    if (!updated북마크[index]) {
      const updated글제목 = [...글제목];
      updated글제목.splice(index, 1);
      set글제목(updated글제목);
    }
  }

  return (
    <div className="App-header">
      <header>
        <h1 style={{ margin: "0 auto" }}>MY PAGE</h1>
        {isLoggedIn ? (
          <Logout onLogout={handleLogout} />
        ) : (
          <button onClick={handleLogin}>로그인</button>
        )}
      </header>
      {isLoggedIn && <Menu onNavigate={handleNavigate} />}
      <main></main>
      {글제목.map((title, index) => (
        <div className="list" key={index}>
          <h4>
            {title}{' '}
            <div className="bookmark">
              <button onClick={() => toggleBookmark(index)}>
                <img src={북마크[index] ? bookmarkImg : unbookmarkImg} alt="북마크" />
              </button>
            </div>
          </h4>
          <p>장소 설명 및 평점</p>
        </div>
      ))}
    </div>
  );
}

export default App;
