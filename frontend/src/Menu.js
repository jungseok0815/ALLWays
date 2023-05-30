// Menu.js

import React from 'react';

function Menu({ onNavigate }) {
  return (
    <div>
      <span className="menu-btn" onClick={() => onNavigate('/home')}>
        홈
      </span>
      <span className="menu-btn" onClick={() => onNavigate('/about')}>
        소개
      </span>
      <span className="menu-btn" onClick={() => onNavigate('/contact')}>
        연락처
      </span>
    </div>
  );
}

export default Menu;
