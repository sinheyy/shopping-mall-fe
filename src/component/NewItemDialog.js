import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CloudinaryUploadWidget from "../utils/CloudinaryUploadWidget";
import CloudinaryUploadWidget2 from "../utils/CloudinaryUploadWidget2";
import { productActions } from "../action/productAction";
import { CATEGORY, STATUS, SIZE, CHOICE } from "../constants/product.constants";
import "../style/adminProduct.style.css";
import * as types from "../constants/product.constants";
import { commonUiActions } from "../action/commonUiAction";

const InitialFormData = {
  name: "",
  sku: "",
  stock: {},
  image: "",
  description: "",
  category: [],
  status: "active",
  price: 0,
  brand: "",
  salePrice: 0,
  detail: "",
  choice: "false",
  isNew: "false",
  option: []
};

const NewItemDialog = ({ mode, showDialog, setShowDialog }) => {
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const { error } = useSelector((state) => state.product);
  const [formData, setFormData] = useState(
    mode === "new" ? { ...InitialFormData } : selectedProduct
  );
  const [stock, setStock] = useState([]);
  const dispatch = useDispatch();
  const [stockError, setStockError] = useState(false);

  // console.log("stock", stock);

  const handleClose = () => {
    //모든걸 초기화시키고;
    setFormData({ ...InitialFormData });
    setStock([]);

    // console.log("ffff", formData);

    // 다이얼로그 닫아주기
    setShowDialog(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("formdata ????", formData);
    console.log("formdata", stock);
    // [["s", "3"], ["m", 4]] -> {s : 3, m : 4} array를 객체로

    //재고를 입력했는지 확인, 아니면 에러
    if (stock.length == 0) {
      return setStockError(true);
    }

    // 재고를 배열에서 객체로 바꿔주기
    // [['M',2]] 에서 {M:2}로
    const totalStock = stock.reduce((total, item) => {
      return { ...total, [item[0]]: parseInt(item[1]) }
    }, {});

    console.log("totalstock", totalStock);

    if (mode === "new") {
      //새 상품 만들기
      dispatch(productActions.createProduct({ ...formData, stock: totalStock }));
      setShowDialog(false);
    } else {
      // 상품 수정하기
      dispatch(productActions.editProduct({ ...formData, stock: totalStock }, selectedProduct._id));
      setShowDialog(false);
    }
  };

  const handleChange = (event) => {
    //form에 데이터 넣어주기
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });

  };

  const addStock = () => {
    //재고타입 추가시 배열에 새 배열 추가
    setStock([...stock, []]);
  };

  const deleteStock = (idx) => {
    //재고 삭제하기
    const newStock = stock.filter((item, index) => index !== idx);  // idx를 제외한 것만 newStock으로
    setStock(newStock);
  };

  const handleSizeChange = (value, index) => {
    //  재고 사이즈 변환하기
    const newStock = [...stock];
    newStock[index][0] = value;
    setStock(newStock);
  };

  const handleStockChange = (value, index) => {
    //재고 수량 변환하기
    const newStock = [...stock];
    newStock[index][1] = value;
    setStock(newStock);
  };

  const onHandleCategory = (event) => {
    // 카테고리가 이미 추가되어 있으면 제거
    if (formData.category.includes(event.target.value)) {
      const newCategory = formData.category.filter(
        (item) => item !== event.target.value
      );
      setFormData({
        ...formData,
        category: [...newCategory],
      });
    }
    // 아니면 새로 추가
    else {
      setFormData({
        ...formData,
        category: [...formData.category, event.target.value],
      });
    }
  };

  const uploadImage = (url) => {
    //이미지 업로드
    setFormData({ ...formData, image: url });
  };

  const uploadDetail = (url) => {
    //이미지 업로드
    setFormData({ ...formData, detail: url });
  };

  useEffect(() => {
    if (showDialog) {
      if (mode === "edit") {
        // 선택된 데이터값 불러오기 (재고 형태 객체에서 어레이로 바꾸기)
        setFormData(selectedProduct);
        console.log("selectedProduct", selectedProduct);
        const stockArray = Object.keys(selectedProduct.stock).map((size) => [size, selectedProduct.stock[size]]);  // Object.keys하면 [s, m] - array로 key 값만 나옴
        setStock(stockArray);
      } else {
        // 초기화된 값 불러오기
        setFormData({ ...InitialFormData });
        setStock([]);
      }
    }
  }, [showDialog]);

  //에러나면 토스트 메세지 보여주기

  return (
    <Modal show={showDialog} onHide={handleClose} className="modal">
      <Modal.Header closeButton>
        {mode === "new" ? (
          <Modal.Title>상품 등록</Modal.Title>
        ) : (
          <Modal.Title>상품 수정</Modal.Title>
        )}
      </Modal.Header>

      <Form className="form-container" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="sku">
            <Form.Label>SKU</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="string"
              placeholder="ex)sku000"
              required
              value={formData.sku}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="brand">
            <Form.Label>브랜드</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="string"
              placeholder="브랜드를 입력해주세요"
              required
              value={formData.brand}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="name">
            <Form.Label>상품명</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="string"
              placeholder="상품명을 입력해주세요"
              required
              value={formData.name}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>설명</Form.Label>
          <Form.Control
            type="string"
            placeholder="상품을 소개해주세요!"
            as="textarea"
            onChange={handleChange}
            rows={2}
            value={formData.description}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="stock">
          <Form.Label className="mr-1">재고 관리</Form.Label>
          {stockError && (
            <span className="error-message">재고를 추가해주세요!</span>
          )}
          <Button id="basic-button" size="sm" onClick={addStock}>
            + 추가
          </Button>
          <div className="mt-2">
            {stock.map((item, index) => (
              <Row key={`${index}${item[0]}`}>
                <Col sm={4}>
                  <Form.Select
                    onChange={(event) =>
                      handleSizeChange(event.target.value, index)
                    }
                    required
                    defaultValue={item[0] ? item[0].toLowerCase() : ""}
                  >
                    <option value="" disabled selected hidden>
                      옵션 선택
                    </option>
                    {SIZE.map((item, index) => (
                      <option
                        invalid="true"
                        value={item.toLowerCase()}
                        disabled={stock.some(
                          (size) => size[0] === item.toLowerCase()
                        )}
                        key={index}
                      >
                        {item}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col sm={6}>
                  <Form.Control
                    onChange={(event) =>
                      handleStockChange(event.target.value, index)
                    }
                    type="number"
                    placeholder="재고(숫자) 입력"
                    value={item[1]}
                    required
                  />
                </Col>
                <Col sm={2}>
                  <Button
                    className="delete-button"
                    size="sm"
                    onClick={() => deleteStock(index)}
                  >
                    -
                  </Button>
                </Col>
              </Row>
            ))}
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Image" required>
          <Form.Label>상품 대표 이미지</Form.Label>
          <CloudinaryUploadWidget uploadImage={uploadImage} imageId={"uploadedimage"} />

          <img
            id="uploadedimage"
            src={formData.image}
            className="upload-image mt-2"
            alt="미리보기"
            style={{ height: "100px", width: "fit-content" }}
          />

        </Form.Group>

        <Form.Group className="mb-3" controlId="Detail" required>
          <Form.Label>상품 상세 이미지</Form.Label>
          <CloudinaryUploadWidget2 uploadImage={uploadDetail} imageId={"uploadeddetail"} />

          <img
            id="uploadeddetail"
            src={formData.detail}
            className="upload-image mt-2"
            alt="미리보기"
            style={{ height: "100px", width: "fit-content" }}
          ></img>
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="price">
            <Form.Label>정상가</Form.Label>
            <Form.Control
              value={formData.price}
              required
              onChange={handleChange}
              type="number"
              placeholder="0"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="salePrice">
            <Form.Label>할인가</Form.Label>
            <Form.Control
              value={formData.salePrice}
              required
              onChange={handleChange}
              type="number"
              placeholder="0"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="category">
            <Form.Label>분류</Form.Label>
            <Form.Control
              as="select"
              multiple
              onChange={onHandleCategory}
              value={formData.category}
              required
            >
              {CATEGORY.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="status">
            <Form.Label>상태</Form.Label>
            <Form.Select
              value={formData.status}
              onChange={handleChange}
              required
            >
              {STATUS.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <Form.Group as={Col} controlId="isNew">
          <Form.Label>신상 표시 여부</Form.Label>
          <Form.Select
            value={formData.isNew}
            onChange={handleChange}
            required
          >
            {CHOICE.map((item, idx) => (
              <option key={idx} value={item.toLowerCase()}>
                {item}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="choice">
          <Form.Label>MD's PICK 표시 여부</Form.Label>
          <Form.Select
            value={formData.choice}
            onChange={handleChange}
            required
          >
            {CHOICE.map((item, idx) => (
              <option key={idx} value={item.toLowerCase()}>
                {item}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Row>

        </Row>
        <div className="display-center">
          {mode === "new" ? (
            <Button id="basic-button" type="submit">
              등록
            </Button>
          ) : (
            <Button id="basic-button" type="submit">
              수정
            </Button>
          )}
        </div>

      </Form>
    </Modal>
  );
};

export default NewItemDialog;
