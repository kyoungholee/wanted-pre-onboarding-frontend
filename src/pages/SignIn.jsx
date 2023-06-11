import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const DirectHandler = () => {
    if (localStorage.getItem("access_token")) {
      console.log("이동완료!!");
      navigate("/todo");
    }
  };

  const asd = axios.create({
    baseURL: "https://www.pre-onboarding-selection-task.shop",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      email: email,
      password: password,
    },
  });

  const loginFormHandler = (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    asd.post("/auth/signin", userData).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("access_token", res.data.access_token);
        navigate("/todo");
      } else if (res.status === 400) {
        console.log("에러야 !!~");
      }
    });
  };

  return (
    <div className="loginFormContainer">
      <button onClick={DirectHandler}>다이렉트 이동</button>

      <form onSubmit={loginFormHandler}>
        <input
          type="email"
          required
          placeholder="이메일을 입력해주세요."
          data-testid="email-input"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          required
          placeholder="비밀번호를 입력해주세요."
          data-testid="password-input"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button data-testid="signin-button">로그인</button>
      </form>
    </div>
  );
}
