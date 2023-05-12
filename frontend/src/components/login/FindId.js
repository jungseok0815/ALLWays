import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FindId() {
  const [realname, setRealname] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!realname) {
      alert("이름을 입력해주세요!");
      return;
    } else if (!email) {
      alert("이메일을 입력해주세요!");
      return;
    }

    axios
      .post("http://localhost:8080/api/findId", {
        realname: realname,
        email: email,
      })
      .then((response) => {
        const messageDiv = document.getElementById("message1");
        messageDiv.innerHTML = response.data.message;
        // 이메일로 아이디 전송 요청 보내기
        axios
          .post("http://localhost:8080/api/sendEmail-id", {
            realname: realname,
            email: email,
          })
          .then((response) => {
            alert(response.data.message);
            const messageDiv = document.getElementById("message1");
            messageDiv.innerHTML = "";
          })
          .catch((error) => {
            alert(error.response.data.message);
            console.log(error);
          });
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Findid Page</h1>
        <button onClick={() => navigate("/FindPassword")}>비밀번호 찾기</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={() => navigate("/")}>로그인하기</button>
        <hr />
      </div>
      <label>
        이름:
        <input
          type="text"
          value={realname}
          onChange={(e) => setRealname(e.target.value)}
        />
      </label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <label>
        이메일:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button type="submit">아이디 찾기</button>
      <br />
      <div id="message1"></div>
    </form>
  );
}

export default FindId;
