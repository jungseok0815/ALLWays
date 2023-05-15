import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  return (
    <div className="main-container">
      <div className="content-container">
        <img src="welcome.jpg" alt="Welcome" />
        <p>어서오세요!</p>
        <div>
          <button onClick={() => navigate("/loginform")}>로그인</button>
          <button onClick={() => navigate("/join")}>회원가입</button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
