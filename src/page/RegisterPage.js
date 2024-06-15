import React, { useEffect, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { userActions } from "../action/userAction";
import "../style/register.style.css";
import * as types from "../constants/user.constants";
import ClipLoader from "react-spinners/ClipLoader";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    policy: false,
  });
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [policyError, setPolicyError] = useState(false);
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    return () => {
      dispatch(userActions.clearError());
    };
  }, [dispatch]);

  const register = (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword, policy } = formData;
    // 비번 중복확인 일치하는지 확인
    if (password !== confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 이용약관에 체크했는지 확인
    if (!policy) {
      setPolicyError(true);
      return;
    }

    // FormData에 있는 값을 가지고 백엔드로 넘겨주기
    setPasswordError("");
    setPolicyError(false);
    dispatch(userActions.registerUser({ name, email, password }, navigate));
    //성공후 로그인 페이지로 넘어가기
  };

  const handleChange = (event) => {
    // 값을 읽어서 FormData에 넣어주기
    const { id, value, checked } = event.target;
    
    if (id == "policy") {
      setFormData({ ...formData, [id]: checked });
    }
    else {
      setFormData({ ...formData, [id]: value });
    }

  };

  return (
    <>
      <div className='login-text'>JOIN MEMBER</div>
      <div className='line' />
      {loading ?
        (<div className='loading'><ClipLoader color="#FB6D33" loading={loading} size={100} /></div>)
        :
        (
          <Container className="register-area">
            {error && (
              <div>
                <Alert variant="danger" className="error-message">
                  {error}
                </Alert>
              </div>
            )}
            <Form onSubmit={register}>
              <Form.Group className="mb-3">
                <Form.Label>이메일 아이디<a style={{ color: "#FA5500" }}>*</a></Form.Label>
                <Form.Control
                  className="form-input"
                  type="email"
                  id="email"
                  placeholder="이메일 아이디를 @까지 정확하게 입력하세요"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>이름<a style={{ color: "#FA5500" }}>*</a></Form.Label>
                <Form.Control
                  className="form-input"
                  type="text"
                  id="name"
                  placeholder="ex)홍길동"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>비밀번호<a style={{ color: "#FA5500" }}>*</a></Form.Label>
                <Form.Control
                  className="form-input"
                  type="password"
                  id="password"
                  placeholder="비밀번호를 입력해주세요"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>비밀번호 확인<a style={{ color: "#FA5500" }}>*</a></Form.Label>
                <Form.Control
                  className="form-input"
                  type="password"
                  id="confirmPassword"
                  placeholder="비밀번호를 다시 입력해주세요"
                  onChange={handleChange}
                  required
                  isInvalid={passwordError}
                />
                <Form.Control.Feedback type="invalid">
                  {passwordError}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="이용약관에 동의합니다"
                  id="policy"
                  onChange={handleChange}
                  isInvalid={policyError}
                  checked={formData.policy}
                />
              </Form.Group>
              <div className="text-align-center mt-2">
                <Button className="signup-click" type="submit">
                  회원가입
                </Button>
              </div>

            </Form>
          </Container>
        )}

    </>

  );
};

export default RegisterPage;
