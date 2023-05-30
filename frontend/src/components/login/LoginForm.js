import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!id) {
      alert("아이디를 입력해주세요!");
      return;
    } else if (!password) {
      alert("비밀번호를 입력해주세요!");
      return;
    }

    axios
      .post("http://localhost:8080/api/login", {
        id: id,
        password: password, 
      })
      .then((response) => {
        navigate(location.state?.from || "/welcome", {
          state: { isLoggedIn: true },
        });
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <div className="outer">
      <div className="box2">
        <form onSubmit={handleSubmit}>
          <p id="loginp">로그인</p>
          <div className="loginspacing1"></div>
          <div className="input-container">
          <input
            type="text"
            value={id}
            placeholder="아이디"
            onChange={(e) => setId(e.target.value)}
          />
          <div className="loginspacing"></div>
          <input
            type="password"
            value={password}
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
          <div className="loginspacing2"></div>
          <p>
            <button type="submit" className="loginbtn">로그인</button>
          </p>
          <div className="loginspacing3"></div>
          <div className="idpw">
            <button onClick={() => navigate("/join")}>회원가입</button>
            <button onClick={() => navigate("/FindId")}>아이디 찾기</button>
            <button onClick={() => navigate("/FindPassword")}>
              비밀번호 찾기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
