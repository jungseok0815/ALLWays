// Logout.js

import React from 'react';

function Logout({ onLogout }) {
  return (
    <button className="logout-btn" onClick={onLogout}>
      로그아웃
    </button>
  );
}

export default Logout;
