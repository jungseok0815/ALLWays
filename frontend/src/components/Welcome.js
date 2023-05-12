import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state || !location.state.isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/");
    }
  }, [location.state, navigate]);

  return (
    <div>
      <h1>환영합니다!</h1>
      <p>로그인에 성공하셨습니다.</p>
    </div>
  );
}

export default Welcome;
