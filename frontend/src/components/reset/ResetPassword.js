import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./ResetPassword.css";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!password || !confirmPassword) {
      alert("비밀번호와 비밀번호 확인란을 모두 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    axios
      .post("http://localhost:8080/api/changePassword", {
        password: password,
        email: email,
      })
      .then((response) => {
        alert(response.data.message);
        navigate("/");
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <div className="outer">
      <div className="rpwdbox">
        <h1 className="rpwdh">비밀번호 초기화</h1>
        <form onSubmit={handleSubmit}>
          <div className="rrow">
            <h3 className="reset_title">
              <label className="rpwdnew">새로운 비밀번호</label>
            </h3>

            <input
              className="new"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="rrow">
            <h3 className="reset_title">
              <label className="rpwdcheck">비밀번호 확인</label>
            </h3>

            <input
              className="check"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="rpwdbtn">
            비밀번호 초기화
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
