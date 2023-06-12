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
    <div className="outer">
      <div className="findpwdbox">
        <form onSubmit={handleSubmit}>
          <div className="pwdbox">
            <h1 className="findpwd1">비밀번호 찾기</h1>
            <button
              className="loginbtn3"
              onClick={() => navigate("/Loginform")}
            >
              로그인하기
            </button>
            <hr className="line2" />
          </div>

          <div className="row2">
            <label className="pwdid">아이디</label>
            <input
              className="id1"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="row2">
            <label className="pwdname">이름</label>
            <input
              className="name1"
              type="text"
              value={realname}
              onChange={(e) => setRealname(e.target.value)}
            />
          </div>
          <div className="row2">
            <label className="pwdemail">이메일</label>
            <input
              className="email1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleEmailKeyPress}
            />
          </div>
          <button type="submit" className="findpwdbtn">
            인증코드 받기
          </button>
        </form>
        <div className="row2">
          <form onSubmit={handleVerifyCode}>
            <label className="pwdauth">인증코드</label>
            <input
              className="auth1"
              type="text"
              value={resetCode}
              onChange={(e) => setResetode(e.target.value)}
              onKeyPress={handleCodeKeyPress}
            />

            <button type="submit" className="authbtn">
              인증
            </button>
            <div id="message2"></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FindPassword;
