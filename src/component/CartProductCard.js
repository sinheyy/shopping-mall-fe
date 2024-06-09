import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { cartActions } from "../action/cartAction";
import { currencyFormat } from "../utils/number";
import { commonUiActions } from "../action/commonUiAction";

const CartProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleQtyChange = () => {
    //아이템 수량을 수정한다
  };

  const deleteCart = (id) => {
    //아이템을 지운다
    if (window.confirm("삭제하시겠습니까?")) {
      
    }
    else {
      dispatch(commonUiActions.showToastMessage("상품 삭제가 취소되었습니다.", "success"));
    }
  };

  return (
    <div className="product-card-cart">
      <Row>
        <Col md={2} xs={12}>
          <img
            src={item.productId.image}
            width={112}
          />
        </Col>
        <Col md={10} xs={12}>
          <div className="product-cart-brand">{item.productId.brand}</div>
          <div className="display-flex space-between">
            <div className="product-cart-name">{item.productId.name}</div>
            <button className="trash-button">
              <FontAwesomeIcon
                icon={faTrash}
                width={24}
                onClick={() => deleteCart("hard_code")}
              />
            </button>
          </div>

          <div>
            가격 : <span className="product-cart-price">{currencyFormat(item.productId.price)} 원</span>
            <span className="product-cart-saleprice">
              {currencyFormat(item.productId.salePrice)} 원
            </span>
          </div>
          <div>옵션 : {item.option.toUpperCase()}</div>
          <div>합계 : <strong>{currencyFormat(item.productId.salePrice * item.qty)}</strong> 원</div>
          <div>
            수량 :
            <Form.Select
              onChange={(event) => handleQtyChange()}
              required
              defaultValue={1}
              className="qty-dropdown"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </Form.Select>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartProductCard;
