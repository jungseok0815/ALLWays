import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";
import { useRecoilState } from "recoil";
import { userIdState } from "../state/atom";
import welcomeImage from "../welcome.jpg"

function MainPage() {
  const [userId, setUserId] = useRecoilState(userIdState);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (userId == null) {
      navigate("/loginform");
    } else {
      navigate("/welcome");
    }
  };
  return (
    <div className="outer">
      <div className="box">
        <div className="content-container">
          <img src={welcomeImage} alt="Welcome" className="welcome-image" />
          <p className="mainp">어서오세요 !</p>
          <div className="buttons">
            <form onSubmit={handleSubmit}>
              <button type="submit">로그인</button>
            </form>
            <button onClick={() => navigate("/join")}>회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
