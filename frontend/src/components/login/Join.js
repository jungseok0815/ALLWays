import React, { useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";

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
        navigate("/");
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Signup Page</h1>
        <button onClick={() => navigate("/")}>
        로그인 페이지로 이동
        </button>
        <hr />

        <label>
          아이디:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <br />
        <label>
          비밀번호:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          비밀번호 확인:
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </label>
        <br />
        <label>
          이름:
          <input
            type="text"
            value={realname}
            onChange={(e) => setRealname(e.target.value)}
          />
        </label>
        <br />
        <label>
          이메일:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default Join;
