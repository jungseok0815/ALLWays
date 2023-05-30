import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FindId.css";

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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div className="outer">
    <form onSubmit={handleSubmit}>
      <div className="findidbox">
      <div className="h">
        <h1 className="findidh1">아이디 찾기</h1>
        <div className="buttons2">
        <button onClick={() => navigate("/FindPassword")}>비밀번호 찾기</button>
        <button onClick={() => navigate("/Loginform")}>로그인하기</button>
        </div>
        <hr className="line" />
      </div>

      <div className="row">
              <label for="name" className="findname">이름</label>
              <input
                type="text"
                value={realname}
                onChange={(e) => setRealname(e.target.value)}
                onKeyPress={handleKeyPress}
              />
      </div>
      <div className="row">
              <label for="name" className="findemail">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              />
      </div>
      <button type="submit" className="findidbtn">아이디 찾기</button>
      </div>
    </form>
    </div>
  );
}

export default FindId;
