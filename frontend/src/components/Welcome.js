import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Welcome() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;

  useEffect(() => {
    if (!location.state || !location.state.isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/");
    }
  }, [location.state, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8080/api/logout", {
        id: id,
      })
      .then((response) => {
        alert(response.data.message);
        navigate("/loginform");
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <h1>환영합니다!</h1>
        <p>로그인에 성공하셨습니다.</p>
        <form onSubmit={handleSubmit}>
          <button>로그아웃</button>
        </form>
      </div>
    </div>
  );
}

export default Welcome;
