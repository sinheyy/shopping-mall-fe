import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import OrderReceipt from "../component/OrderReceipt";
import PaymentForm from "../component/PaymentForm";
import "../style/paymentPage.style.css";
import { useSelector, useDispatch } from "react-redux";
import { orderActions } from "../action/orderAction";
import { cartActions } from "../action/cartAction";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { commonUiActions } from "../action/commonUiAction";
import { cc_expires_format } from "../utils/number";
import * as types from "../constants/order.constants";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const [cardValue, setCardValue] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });
  const navigate = useNavigate();
  const [firstLoading, setFirstLoading] = useState(true);
  const [shipInfo, setShipInfo] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    address: "",
    city: "",
    zip: "",
  });
  const { cartList, totalPrice, totalSalePrice, totalProductPrice } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  //맨처음 페이지 로딩할때는 넘어가고  오더번호를 받으면 성공페이지로 넘어가기
  console.log(cartList);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit - cartList", cartList);
    //오더 생성하기
    // step1. 백엔드로 데이터 보내기 (데이터 정리 필요)
    const { firstName, lastName, contact, address, city, zip } = shipInfo
    const data = {
      totalPrice,
      shipTo: { address, city, zip },
      contact: { firstName, lastName, contact },
      orderList: cartList.map(item => {
        console.log("option   ", item.option);
        return {
          productId: item.productId._id,
          price: item.productId.salePrice,
          qty: item.qty,
          option: item.option
        }
      })
    }   // 백엔드로 보낼 데이터 정리

    console.log("create오더 호출 전", data);
    dispatch(orderActions.createOrder(data, navigate));

  };

  const handleFormChange = (event) => {
    //shipInfo에 값 넣어주기
    const { name, value } = event.target;
    setShipInfo({ ...shipInfo, [name]: value });
  };

  const handlePaymentInfoChange = (event) => {
    //카드정보 넣어주기
    const { name, value } = event.target;
    if (name === "expiry") {
      let newValue = cc_expires_format(value);
      setCardValue({ ...cardValue, [name]: newValue });
      return;
    }
    setCardValue({ ...cardValue, [name]: value });
  };

  const handleInputFocus = (e) => {
    setCardValue({ ...cardValue, focus: e.target.name });
  };

  //카트에 아이템이 없다면 다시 카트페이지로 돌아가기 (결제할 아이템이 없으니 결제페이지로 가면 안됌)
  if (cartList.length === 0) {
    navigate("/cart");
  }

  return (
    <Container className="order-container">
      <Row>
        <Col lg={7}>
          <div>
            <h3 className="order-title">주문자 정보</h3>
            <div className='line' />
            <Row>
              <Col lg={6}>주문하시는 분</Col>
              <Col lg={6}>{user?.name}</Col>
            </Row>
            <Row>
              <Col lg={6}>이메일</Col>
              <Col lg={6}>{user?.email}</Col>
            </Row>

            <div style={{ margin: "30px" }} />
          </div>
          <div>
            <h3 className="order-title">배송지 정보</h3>
            <div className='line' />
            <div>
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Row}>
                  <Form.Label>받으시는 분</Form.Label>
                </Form.Group>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="lastName">
                    <Form.Label>성</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleFormChange}
                      required
                      name="lastName"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="firstName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleFormChange}
                      required
                      name="firstName"
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>휴대폰 번호</Form.Label>
                  <Form.Control
                    placeholder="010-XXXX-XXXX"
                    onChange={handleFormChange}
                    required
                    name="contact"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <div style={{ margin: "30px" }} />
                  <Form.Label>상세 주소</Form.Label>
                  <Form.Control
                    placeholder="상세 주소를 입력해주세요"
                    onChange={handleFormChange}
                    required
                    name="address"
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>도시</Form.Label>
                    <Form.Control
                      onChange={handleFormChange}
                      required
                      name="city"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>우편번호</Form.Label>
                    <Form.Control
                      onChange={handleFormChange}
                      required
                      name="zip"
                    />
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="formGridDelieveryMessage">
                  <Form.Label>배송 메세지</Form.Label>
                  <Form.Control
                    value="부재 시 문 앞에 놓아주세요"
                  />
                </Form.Group>
                <div className="mobile-receipt-area">
                  <OrderReceipt cartList={cartList} totalPrice={totalPrice} totalSalePrice={totalSalePrice} totalProductPrice={totalProductPrice} />
                </div>
                <div>
                  <div style={{ margin: "30px" }} />
                  <h2 className="order-title">결제 수단</h2>
                  <div className='line' />
                  <PaymentForm cardValue={cardValue} handleInputFocus={handleInputFocus} handlePaymentInfoChange={handlePaymentInfoChange} />
                </div>

                <Button
                  variant="dark"
                  className="payment-button pay-button"
                  type="submit"
                >
                  결제하기
                </Button>
              </Form>
            </div>
          </div>
        </Col>
        <Col lg={5} className="receipt-area">
          <OrderReceipt cartList={cartList} totalPrice={totalPrice} totalSalePrice={totalSalePrice} totalProductPrice={totalProductPrice} />
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
