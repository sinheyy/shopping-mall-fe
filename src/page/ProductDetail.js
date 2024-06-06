import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { ColorRing } from "react-loader-spinner";
import { cartActions } from "../action/cartAction";
import { commonUiActions } from "../action/commonUiAction";
import { currencyFormat } from "../utils/number";
import "../style/productDetail.style.css";
import ClipLoader from "react-spinners/ClipLoader";

const ProductDetail = () => {
  const dispatch = useDispatch();

  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const [size, setSize] = useState("");
  const { id } = useParams();
  const [sizeError, setSizeError] = useState(false);

  const navigate = useNavigate();

  const pickIsTrue = () => {
    return selectedProduct.choice ? true : false
  }

  const addItemToCart = () => {
    //사이즈를 아직 선택안했다면 에러
    // 아직 로그인을 안한유저라면 로그인페이지로
    // 카트에 아이템 추가하기
  };
  const selectSize = (value) => {
    // 사이즈 추가하기
  };

  //카트에러가 있으면 에러메세지 보여주기

  //에러가 있으면 에러메세지 보여주기

  useEffect(() => {
    //상품 디테일 정보 가져오기
    dispatch(productActions.getProductDetail(id));
  }, [id]);

  if (loading || !selectedProduct) {
    return (<div className='loading' > <ClipLoader color="#FB6D33" loading={loading} size={100} /></div>);
  }
  else {
    return (
      <Container className="product-detail-card">
        <Row>
          <Col sm={6}>
            <img
              src={selectedProduct.image}
              className="w-100"
              alt="image"
            />
          </Col>
          <Col className="product-info-area" sm={6}>
            <div className='detail-product-description'>{selectedProduct.description}</div>
            <div className={`pickbox${pickIsTrue ? "_switched" : ""}`}>{selectedProduct.choice == true ? "[MD PICK]" : ""}</div>
            <div className='detail-product-brand'><b>{selectedProduct.brand}</b></div>
            <br />
            <div className='detail-product-name'>{selectedProduct.name}<h className='detail-product-new'>{selectedProduct.isNew == true ? "NEW" : ""}</h></div>
            <br />
            <div className='detail-product-price'>정상가<h> {currencyFormat(selectedProduct.price)} 원 </h></div>
            <div className='detail-product-saleprice'>할인가<b> {currencyFormat(selectedProduct.salePrice)} </b>원 <b className='detail-product-saleper'>{Math.round((selectedProduct.price - selectedProduct.salePrice) / selectedProduct.price * 100)}%</b></div>
            <div className='detail-line' />

            <Dropdown
              variant="none"
              className="drop-down size-drop-down"
              title={size}
              align="start"
              onSelect={(value) => selectSize(value)}
            >
              <Dropdown.Toggle
                className="size-drop-down"
                variant={sizeError ? "outline-danger" : "outline-dark"}
                id="dropdown-basic"
                align="start"
              >
                {size === "" ? "옵션 선택" : size.toUpperCase()}
              </Dropdown.Toggle>

              <Dropdown.Menu className="size-drop-down">
                {Object.keys(selectedProduct.stock).map((size) => [size, selectedProduct.stock[size]]).map((item, index) => (
                  item[1] > 0 ?
                    (<Dropdown.Item className="size-drop-down-abled">{item[0]}</Dropdown.Item>)
                    :
                    (<Dropdown.Item className="size-drop-down-disabled" disabled>{item[0]}</Dropdown.Item>)

                ))}
              </Dropdown.Menu>
            </Dropdown>
            <div className="warning-message">
              {sizeError && "사이즈를 선택해주세요."}
            </div>
            <button className="add-button" onClick={addItemToCart}>
              추가
            </button>
          </Col>
        </Row>
        <Row>
          <div className="product-detail-text">DETAIL</div>
        </Row>
        <Row>
          <img
            src={selectedProduct.detail}
            className="w-100"
            alt="image"
          />
        </Row>
      </Container>
    );
  }

};

export default ProductDetail;
