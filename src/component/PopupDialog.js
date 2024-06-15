import React from 'react'
import { Modal, Button, Row, Col, Table } from "react-bootstrap";

const PopupDialog = ({ showDialog, handleClose }) => {

    return (
        <Modal show={showDialog} onHide={handleClose} className="order-dialog">
            <Modal.Header closeButton>
                <Modal.Title><strong>EVENT</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='event-text'>
                    <img width={400} src="/image/event.png" alt="event image" />
                    <h5>결제할 때, 쿠폰 코드 입력 후 사용 버튼을 누르면 10% 할인 받을 수 있어요!</h5>
                    <h4>쿠폰 코드 : DISCOUNT</h4>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default PopupDialog
