import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { badgeBg } from "../constants/order.constants";
import { currencyFormat } from "../utils/number";
import MyOrderDetailDialog from "../component/MyOrderDetailDialog";
import { useState } from "react";

const OrderStatusCard = ({ item }) => {
  const [open, setOpen] = useState(false);

  const openEditForm = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Row className="order-date">
        <Col lg={10}>[{item.createdAt.slice(0, 10)}]</Col>
        <Col lg={2}>
          <button className="order-detail-button" onClick={openEditForm}>더보기</button>
        </Col>
      </Row>
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

      {open && <MyOrderDetailDialog open={open} handleClose={handleClose} order={item} />}
    </div>
  );
};

export default OrderStatusCard;
