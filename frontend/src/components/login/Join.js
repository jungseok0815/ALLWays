import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Join.css";

function Join() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [realname, setRealname] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!id) {
      alert("아이디를 입력해주세요!");
      return;
    } else if (!password) {
      alert("비밀번호를 입력해주세요!");
      return;
    } else if (!passwordConfirm) {
      alert("비밀번호를 한번 더 확인해주세요!");
      return;
    } else if (!realname) {
      alert("이름을 입력해주세요!");
      return;
    } else if (!email) {
      alert("이메일을 입력해주세요!");
      return;
    }

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    axios
      .post(
        "http://localhost:8080/api/join",
        {
          id: id,
          password: password,
          realname: realname,
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alert(response.data.message);
        console.log(response.data);
        navigate("/loginform");
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <div className="outer">
      <div className="joinbox">
        <form onSubmit={handleSubmit}>
          <h1 id="join">회원가입</h1>
          <button
            type="button"
            onClick={() => navigate("/LoginForm")}
            className="loginbtn2"
          >
            로그인 페이지로 이동
          </button>
          <hr className="line3" />
          <div className="join_row">
            <h3 className="join_title">
              <label for="id">아이디</label>
            </h3>
            <span className="ps_box int_id">
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </span>
          </div>
          <div className="join_row">
            <h3 className="join_title">
              <label for="password">비밀번호</label>
            </h3>
            <span className="ps_box int_pass">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </span>
          </div>
          <div className="join_row">
            <h3 className="join_title">
              <label for="passwordConfirm">비밀번호 확인</label>
            </h3>
            <span className="ps_box int_pass_check">
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </span>
          </div>
          <div className="join_row">
            <h3 className="join_title">
              <label for="realname">이름</label>
            </h3>
            <span className="ps_box box_right_space">
              <input
                type="text"
                value={realname}
                onChange={(e) => setRealname(e.target.value)}
              />
            </span>
          </div>
          <div className="join_row">
            <h3 className="join_title">
              <label for="email">이메일</label>
            </h3>
            <span className="ps_box int_email box_right_space">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </span>
          </div>
          <button type="submit" id="submitBtn" className="submitbtn">
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default Join;
