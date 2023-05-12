import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';

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
        console.log(response.data);
        navigate(location.state?.from || "/welcome", { state: {isLoggedIn: true}});
      })
      .catch((error) => { 
        alert(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        아이디:
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <label>
        비밀번호:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={() => navigate("/join")}>
        회원가입
      </button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={() => navigate("/FindId")}>
        아이디 찾기
      </button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={() => navigate("/FindPassword")}>
        비밀번호 찾기
      </button>
    </form>
  );
}

export default LoginForm;
