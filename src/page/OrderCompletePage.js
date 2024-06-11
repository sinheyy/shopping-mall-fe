import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../style/paymentPage.style.css";

const OrderCompletePage = () => {
  const { orderNum } = useSelector((state) => state.order);

  //만약 주문번호가 없는상태로 이페이지에 왔다면 다시 메인페이지로 돌아가기
  if (orderNum === "") {
    return (<Container className="confirmation-page">
      <h1 className="order-title">주문 실패</h1>
      <img
        src="https://cdn-icons-png.flaticon.com/128/4201/4201973.png"
        width={130}
        className="check-image"
        alt="warning image"
      />
      <div className="text-align-center ordernum">
        주문에 실패했습니다.<br />
        메인 페이지로 돌아가려면 아래 버튼을 누르세요.
      </div>
      <button className="basic-button">
        <Link to={"/"}>메인 페이지로 돌아가기</Link>
      </button>
    </Container>);
  }

  return (
    <Container className="confirmation-page">
      <h2 className="order-title">ORDER COMPLETE</h2>
      <img
        src="/image/greenCheck.png"
        width={100}
        className="check-image"
        alt="greenCheck.png"
      />
      <h2>고객님의 주문이 완료되었습니다.</h2>
      <div className="ordernum">주문 번호:<span>{orderNum}</span></div>


      <div>
        <span style={{ marginRight: "10px" }} className="text-align-center">
          <button className="basic-button">
            <Link to={"/"}>쇼핑 계속하기</Link>
          </button>
        </span>
        <span className="text-align-center">
          <button className="basic-button">
            <Link to={"/account/purchase"}>주문내역/배송조회 보기</Link>
          </button>
        </span>
      </div>
    </Container >
  );
};

export default OrderCompletePage;
