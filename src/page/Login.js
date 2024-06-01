import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../action/userAction";
import ClipLoader from "react-spinners/ClipLoader";
import "../style/login.style.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);

  const loginWithEmail = (event) => {
    event.preventDefault();
    //이메일,패스워드를 가지고 백엔드로 보내기
    dispatch(userActions.loginWithEmail({ email, password }));
  };

  const handleGoogleLogin = async (googleData) => {
    // 구글로 로그인 하기
  };

  // user가 있으면 메인 페이지로 이동 - 이미 로그인한 유저는 로그인 페이지에 못 들어오게 막기 위함
  if (user) {
    navigate("/");
  }
  return (
    <>
      <div className='login-text'>LOGIN</div>
      <div className='line' />
      {loading ?
        (<div className='loading'><ClipLoader color="#FB6D33" loading={loading} size={100} /></div>)
        :
        (
          <Container className="login-area">
            {error && (
              <div>
                <Alert className="error-message" variant="danger">{error}</Alert>
              </div>
            )}
            <Form className="login-form" onSubmit={loginWithEmail}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>이메일 아이디</Form.Label>
                <Form.Control
                  className="form-input"
                  type="email"
                  placeholder="이메일 아이디를 @까지 정확하게 입력하세요"
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                  className="form-input"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>

              <div className="text-align-center mt-2">
                <Button className='login-click' type="submit">
                  로그인
                </Button>
              </div>

              <div className="text-align-center mt-2">
                지금 가입하면 10% 할인 쿠폰+웰컴 쿠폰팩 증정
              </div>

              <div className="text-align-center mt-2">
                <Link to="/register" className="signup-click">이메일로 가입하기</Link>{" "}
              </div>

              <div className="text-align-center mt-2">
                <p>-외부 계정으로 로그인하기-</p>
                <div className="display-center"></div>
              </div>
            </Form>
          </Container >
        )
      }

    </>
  );
};

export default Login;
