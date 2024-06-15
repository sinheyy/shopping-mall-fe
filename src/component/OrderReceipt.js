import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const OrderReceipt = ({ cartList, totalPrice, totalSalePrice, totalProductPrice }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="receipt-container">
      <h3 className="receipt-title">주문 내역</h3>
      <ul className="receipt-list">
        {cartList.length > 0 && cartList.map((item) =>
          <li>
            <div className="display-flex space-between">
              <div>{item.productId.name}</div>
              <div>{item.option.toUpperCase()}</div>
              <div>X{item.qty}</div>
              <div className="receipt-price">{currencyFormat(item.productId.price * item.qty)} 원</div>
              <div>{currencyFormat(item.productId.salePrice * item.qty)} 원</div>
            </div>
          </li>)}

      </ul>
      <div className="display-flex space-between receipt-total-sale">
        <div>
          총 상품 금액:
        </div>
        <div style={{
          fontSize: "1rem"
        }}>
          {currencyFormat(totalProductPrice)} 원
        </div>
      </div>
      <div className="display-flex space-between receipt-total-sale">
        <div>
          총 할인 금액:
        </div>
        <div style={{
          fontSize: "1rem"
        }}>
          -{currencyFormat(totalSalePrice)} 원
        </div>
      </div>
      
      <div className="display-flex space-between receipt-total">
        <div>
          총 결제 금액:
        </div>
        <div style={{
          fontSize: "1.2rem"
        }}>
          <strong>{currencyFormat(totalPrice)}</strong> 원
        </div>
      </div>
      {location.pathname.includes("/cart") && cartList.length > 0 && (
        <Button
          variant="dark"
          className="payment-button"
          onClick={() => navigate("/payment")}
        >
          선택 상품 주문하기
        </Button>
      )}
    </div>
  );
};

export default OrderReceipt;
