import React, { useState } from "react";
import { Form, Modal, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import "../style/adminOrder.style.css";
import { ORDER_STATUS } from "../constants/order.constants";
import { orderActions } from "../action/orderAction";
import { currencyFormat } from "../utils/number";

const MyOrderDetailDialog = ({ open, handleClose, order }) => {
    const [orderStatus, setOrderStatus] = useState(order.status);
    const dispatch = useDispatch();

    const handleStatusChange = (event) => {
        setOrderStatus(event.target.value);
    };
    const submitStatus = () => {
        handleClose();
    };

    if (!order) {
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
                        <p>주문 번호 : <strong className="order-dialog-ordernum">{order.orderNum}</strong></p>
                        <p>주문 날짜 : {order.createdAt.slice(0, 10)}</p>
                    </Col>
                    <Col lg={6}>
                        <p className="order-dialog-title">배송 정보</p>
                        <p>받는 분 : {`${order.contact.lastName + order.contact.firstName}`}</p>
                        <p>연락처 : {`${order.contact.contact}`}</p>
                        <p>
                            주소 : {order.shipTo.address + ", " + order.shipTo.city}
                        </p>
                    </Col>
                </Row>
                <div className="line"></div>
                <p className="order-dialog-title">주문 내역</p>
                <div className="overflow-x">
                    <Table>
                        <thead>
                            <tr>
                                <th>이미지</th>
                                <th>상품명</th>
                                <th>단가</th>
                                <th>수량</th>
                                <th>가격</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.length > 0 &&
                                order.items.map((item, index) => (
                                    <tr key={item._id}>
                                        <td><img
                                            src={order.items[index].productId.image}
                                            alt=""
                                            height={96}
                                        /></td>
                                        <td>
                                            {item.productId.name}
                                            <br />
                                            옵션 : {item.option}
                                        </td>
                                        <td>{currencyFormat(item.price)}</td>
                                        <td>{item.qty}</td>
                                        <td>{currencyFormat(item.price * item.qty)}</td>
                                    </tr>
                                ))}
                            <tr>
                                <td colSpan={4}>총계:</td>
                                <td><strong>{currencyFormat(order.totalPrice)}</strong></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

                <div className="order-button-area">
                    <Button
                        variant="light"
                        onClick={handleClose}
                        className="basic-button"
                    >
                        확인
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default MyOrderDetailDialog;
