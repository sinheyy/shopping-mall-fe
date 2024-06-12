import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { badgeBg } from "../constants/order.constants";
import { currencyFormat } from "../utils/number";

const OrderStatusCard = ({ item }) => {
  return (
    <div>
      <Row className="order-date">[{item.createdAt.slice(0, 10)}]</Row>
      <Row className="status-card">
        <Col xs={2}>
          <img
            src={item.items[0].productId.image}
            alt=""
            height={96}
          />
        </Col>
        <Col xs={8} className="order-info">
          <div>
            <strong>주문번호: {item.orderNum}</strong>
          </div>

          <div>상품명 : {item.items[0].productId.name}
            {item.items.length > 1 && ` 외 ${item.items.length - 1}개`}</div>
          <div>결제 금액 : {currencyFormat(item.totalPrice)} 원</div>
        </Col>
        <Col md={2} className="vertical-middle">
          <div className="text-align-center text-12">주문상태</div>
          <Badge bg={badgeBg[item.status]}>{item.status}</Badge>
        </Col>
      </Row>
    </div>
  );
};

export default OrderStatusCard;
