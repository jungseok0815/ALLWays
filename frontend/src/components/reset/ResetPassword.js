import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ResetPassword() {
  const { id, resetToken } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isResetSuccessful, setIsResetSuccessful] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!password || !confirmPassword) {
      setError('비밀번호와 비밀번호 확인란을 모두 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post('/api/reset-password', {
        id,
        resetToken,
        password,
      });

      if (response.status === 200) {
        setIsResetSuccessful(true);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  if (isResetSuccessful) {
    return <div>비밀번호 초기화가 완료되었습니다.</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>비밀번호 초기화</h2>
      {error && <div>{error}</div>}
      <div>
        <label htmlFor="password">새로운 비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirm-password">새로운 비밀번호 확인</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </div>
      <button type="submit">비밀번호 초기화</button>
    </form>
  );
}

export default ResetPassword;
