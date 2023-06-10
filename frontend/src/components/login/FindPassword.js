import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FindPassword.css";

function FindPassword() {
  const [id, setId] = useState("");
  const [realname, setRealname] = useState("");
  const [email, setEmail] = useState("");
  const [resetCode, setResetode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!id) {
      alert("아이디를 입력해주세요!");
      return;
    } else if (!realname) {
      alert("이름을 입력해주세요!");
      return;
    } else if (!email) {
      alert("이메일을 입력해주세요!");
      return;
    }

    axios
      .post("http://localhost:8080/api/findPassword", {
        id: id,
        realname: realname,
        email: email,
      })
      .then((response) => {
        const messageDiv = document.getElementById("message2");
        messageDiv.innerHTML = response.data.message;

        axios
          .post("http://localhost:8080/api/sendEmail-password", {
            realname: realname,
            email: email,
          })
          .then((response) => {
            alert(response.data.message);
            const messageDiv = document.getElementById("message2");
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

  const handleVerifyCode = (event) => {
    event.preventDefault();

    if (!resetCode) {
      alert("인증코드를 입력해주세요!");
      return;
    }

    axios
      .post("http://localhost:8080/api/checkResetCode", {
        resetCode: resetCode,
        email: email,
      })
      .then((response) => {
        alert(response.data.message);
        navigate("/ResetPassword", { state: { email: email } });
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
        console.log(resetCode);
      });
  };

  const handleEmailKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleCodeKeyPress = (event) => {
    if (event.key === "Enter") {
      handleVerifyCode(event);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <h1>Findpassword Page</h1>
            <button onClick={() => navigate("/")}>로그인하기</button>
            <hr />
          </div>
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
          <button type="submit">비밀번호 찾기</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <br />
        </form>
      </div>
      <div>
        <form onSubmit={handleVerifyCode}>
          <label>
            인증코드:
            <input
              type="text"
              value={resetCode}
              onChange={(e) => setResetode(e.target.value)}
            />
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="submit">인증</button>
          <br />
          <div id="message2"></div>
        </form>
      </div>
    </div>
  );
}

export default FindPassword;
