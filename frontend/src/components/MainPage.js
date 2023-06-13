import React from "react";
import { useNavigate} from "react-router-dom";
import "./MainPage.css";
import welcomeImage from '../welcome.jpg';

function MainPage() {
  const navigate = useNavigate();
  return (
    <div className="outer">
      <div className="box">
        <div className="content-container">
          <img src={welcomeImage} alt="Welcome" className="welcome-image" />
          <p className="mainp">어서오세요 !</p>
          <div className="buttons">
            <button onClick={() => navigate("/loginform")}>로그인</button>
            <button onClick={() => navigate("/join")}>회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
