import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import SearchBox from "../component/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import NewItemDialog from "../component/NewItemDialog";
import * as types from "../constants/product.constants";
import ReactPaginate from "react-paginate";
import { useSearchParams, useNavigate } from "react-router-dom";
import { commonUiActions } from "../action/commonUiAction";
import ProductTable from "../component/ProductTable";
import ClipLoader from "react-spinners/ClipLoader";
import "../style/adminProduct.style.css";

const AdminProduct = () => {
  const navigate = useNavigate();
  const { productList, totalPageNum } = useSelector((state) => state.product);
  const loading = useSelector((state) => state.user.loading);
  const [query, setQuery] = useSearchParams();
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
  }); //검색 조건들을 저장하는 객체

  const [mode, setMode] = useState("new");
  const tableHeader = [
    "#",
    "SKU",
    "브랜드",
    "상품명",
    "정상가",
    "할인가",
    "재고",
    "상품 이미지",
    "상태",
    "NEW",
    "MD's PICK",
    "",
  ];

  //상품리스트 가져오기 (url쿼리 맞춰서)
  useEffect(() => {
    dispatch(productActions.getProductList({ ...searchQuery }));
  }, [query]);

  useEffect(() => {
    //검색어나 페이지가 바뀌면 url바꿔주기 (검색어또는 페이지가 바뀜 => url 바꿔줌=> url쿼리 읽어옴=> 이 쿼리값 맞춰서  상품리스트 가져오기)
    if (searchQuery.name === "") {
      delete searchQuery.name;
    }

    // URLSearchParams - 객체를 쿼리로 만들어줌
    const params = new URLSearchParams(searchQuery);
    const query = params.toString();
    console.log("qqqq", query);

    navigate("?" + query);

  }, [searchQuery]);

  const deleteItem = (id) => {
    //아이템 삭제하가ㅣ
  };

  const openEditForm = (product) => {
    //edit모드로 설정하고
    // 아이템 수정다이얼로그 열어주기
  };

  const handleClickNewItem = () => {
    //new 모드로 설정하고
    setMode("new");
    // 다이얼로그 열어주기
    setShowDialog(true);
  };

  const handlePageClick = ({ selected }) => {
    //  쿼리에 페이지값 바꿔주기 - 실제페이지는 selected + 1
    //console.log("selected", selected);
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  // searchbox에서 검색어를 읽어옴 -> 엔터를 치면 -> searchQuery 객체가 업데이트 {name:스트레이트 팬츠}
  // -> 업데이트된 searchQuery 객체 안에 아이템 기준으로 url을 새로 생성해서 호출 &name=스트레이트+팬츠
  // -> url에 있는 query를 읽어옴 -> ur 쿼리 기준으로 be에 검색 조건과 함께 호출
  return (
    <div className="locate-center">
      <Container>
        <div className="mt-2">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="상품 검색(상품 이름을 입력해주세요)"
            field="name"
          />
        </div>
        <Button id="basic-button" className="mt-2 mb-2" onClick={handleClickNewItem}>
          + 상품 등록
        </Button>

        {/* {loading ?
          (<div className='loading'><ClipLoader color="#FB6D33" loading={loading} size={100} /></div>)
          :
          (
            <ProductTable
              header={tableHeader}
              data={productList}
              deleteItem={deleteItem}
              openEditForm={openEditForm}
            />
          )
        } */}

        <ProductTable
          header={tableHeader}
          data={productList}
          deleteItem={deleteItem}
          openEditForm={openEditForm}
        />

        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}  // 몇 개 페이지 보여줄지
          pageCount={totalPageNum}   // 전체 페이지
          forcePage={searchQuery.page - 1} // 1페이지면 2임 여긴 한개씩 +1 해야함
          previousLabel="<"
          renderOnZeroPageCount={null}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          activeLinkClassName="active-link"
          disabledClassName="disabled"
          disabledLinkClassName="disabled-link"
          className="display-center list-style-none"
        />
      </Container>

      <NewItemDialog
        mode={mode}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </div>
  );
};

export default AdminProduct;
