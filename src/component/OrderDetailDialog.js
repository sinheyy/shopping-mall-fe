import React, { useState } from "react";
import { Form, Modal, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import "../style/adminOrder.style.css";
import { ORDER_STATUS } from "../constants/order.constants";
import { orderActions } from "../action/orderAction";
import { currencyFormat } from "../utils/number";

const OrderDetailDialog = ({ open, handleClose }) => {
  const selectedOrder = useSelector((state) => state.order.selectedOrder);
  const [orderStatus, setOrderStatus] = useState(selectedOrder.status);
  const dispatch = useDispatch();

  const handleStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };
  const submitStatus = () => {
    dispatch(orderActions.updateOrder(selectedOrder._id, orderStatus));
    handleClose();
  };

  if (!selectedOrder) {
    return <></>;
  }
  return (
    <Modal show={open} onHide={handleClose} className="order-dialog">
      <Modal.Header closeButton>
        <Modal.Title><strong>주문 내역</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={6}>
            <p className="order-dialog-title">주문 정보</p>
            <p>주문 번호 : <strong className="order-dialog-ordernum">{selectedOrder.orderNum}</strong></p>
            <p>주문 날짜 : {selectedOrder.createdAt.slice(0, 10)}</p>
            <p>주문자 : {selectedOrder.userId.name}({selectedOrder.userId.email})</p>
          </Col>
          <Col lg={6}>
            <p className="order-dialog-title">배송 정보</p>
            <p>받는 분 : {`${selectedOrder.contact.lastName + selectedOrder.contact.firstName}`}</p>
            <p>연락처 : {`${selectedOrder.contact.contact}`}</p>
            <p>
              주소 : {selectedOrder.shipTo.address + " " + selectedOrder.shipTo.city}
            </p>
          </Col>
        </Row>
        <div className="line"></div>
        <p className="order-dialog-title">주문 내역</p>
        <div className="overflow-x">
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>상품명</th>
                <th>단가</th>
                <th>수량</th>
                <th>가격</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.items.length > 0 &&
                selectedOrder.items.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.productId.name}</td>
                    <td>{currencyFormat(item.price)}</td>
                    <td>{item.qty}</td>
                    <td>{currencyFormat(item.price * item.qty)}</td>
                  </tr>
                ))}
              <tr>
                <td colSpan={4}>총계:</td>
                <td><strong>{currencyFormat(selectedOrder.totalPrice)}</strong></td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="line"></div>
        <Form onSubmit={submitStatus}>
          <Form.Group as={Col} controlId="status">
            <Form.Label className="order-dialog-title">주문 상태</Form.Label>
            <Form.Select value={orderStatus} onChange={handleStatusChange}>
              {ORDER_STATUS.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="order-button-area">
            <Button
              variant="light"
              onClick={handleClose}
              className="basic-button"
            >
              닫기
            </Button>
            <Button type="submit" className="basic-button">저장</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OrderDetailDialog;
