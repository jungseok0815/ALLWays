import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;

  const handleSubmit = async (event) => {
    event.preventDefault();


    if (!password || !confirmPassword) {
      alert('비밀번호와 비밀번호 확인란을 모두 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호와 비밀번호 확인 값이 일치하지 않습니다. 정확하게 입력해주세요.');
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
    <div>
      <h1>비밀번호 초기화</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            새로운 비밀번호:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            비밀번호 확인:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">비밀번호 초기화</button>
      </form>
    </div>
  );
}

export default ResetPassword;
