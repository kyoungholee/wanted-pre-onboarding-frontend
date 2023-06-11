import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //유효성 검사용
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

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
  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    asd.post("/auth/signup", userData).then((res) => {
      if (res.status === 201) {
        console.log("성공!!!");
        navigate("/signin");
      } else if (res.status === 400) {
        console.log("에러야 !!~");
      }
    });
  };

  //이메일
  const onChangeEmail = (e) => {
    const emailRegex = /([\w-.]+)@((([\w-]+\.)+))([a-zA-Z]{2,4})(\]?)$/;

    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      console.log("이메일 형식이 틀렸어요~");
      setIsEmail(false);
    } else {
      console.log("올바른 이메일 형식이에요");
      setIsEmail(true);
    }
  };

  //비밀번호
  const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      console.log(" 8자리 이상 입력해주세요!");
      setIsPassword(false);
    } else {
      console.log("안전한 비밀번호에요 : )");
      setIsPassword(true);
    }
  };

  return (
    <div className="formContainer">
      <h1>회원가입</h1>
      <button onClick={DirectHandler}>다이렉트 이동</button>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="이메일을 입력해주세요."
          data-testid="email-input"
          onChange={onChangeEmail}
        />
        <input
          type="password"
          required
          placeholder="비밀번호를 입력해주세요."
          data-testid="password-input"
          onChange={onChangePassword}
        />
        <button
          data-testid="signup-button"
          type="submit"
          disabled={!(isEmail && isPassword)}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
