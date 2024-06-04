import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";
import ReactPaginate from "react-paginate";
import ClipLoader from "react-spinners/ClipLoader";

const ProductAll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.product.error);
  const searchKeyword = useSelector((state) => state.product.searchKeyword);
  console.log("seeearch", searchKeyword);
  const { productList, totalPageNum } = useSelector((state) => state.product);
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
  }); //검색 조건들을 저장하는 객체

  // 처음 로딩하면 상품리스트 
  //상품리스트 가져오기 (url쿼리 맞춰서)
  useEffect(() => {
    dispatch(productActions.getProductList({ ...searchQuery }));
  }, [query])

  useEffect(() => {
    //검색어나 페이지가 바뀌면 url바꿔주기 (검색어또는 페이지가 바뀜 => url 바꿔줌=> url쿼리 읽어옴=> 이 쿼리값 맞춰서  상품리스트 가져오기)
    if (searchQuery.name === "") {
      delete searchQuery.name;
    }

    // URLSearchParams - 객체를 쿼리로 만들어줌
    const params = new URLSearchParams(searchQuery);
    const query = params.toString();
    console.log("qqqq바뀜!", query);

    navigate("?" + query);

  }, [searchQuery]);

  useEffect(() => {
    console.log("seeearch2222", searchKeyword);
    setSearchQuery({ ...searchQuery, name: searchKeyword });

  }, [searchKeyword])


  const handlePageClick = ({ selected }) => {
    //  쿼리에 페이지값 바꿔주기 - 실제페이지는 selected + 1
    //console.log("selected", selected);
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };


  return (
    <>
      {
        loading ?
          (<div className='loading' > <ClipLoader color="#FB6D33" loading={loading} size={100} /></div>)
          :
          (
            <Container>
              <Row>
                {productList?.map((product, index) =>
                  <Col key={index} className="card" md={3} sm={12}>
                    <ProductCard product={product} />
                  </Col>
                )}
              </Row>

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
          )
      }
    </>

  );
};

export default ProductAll;
