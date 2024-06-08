import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import ClipLoader from "react-spinners/ClipLoader";

const ProductAll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.product.error);
  const searchKeyword = useSelector((state) => state.product.searchKeyword);
  const { productList, totalPageNum } = useSelector((state) => state.product);
  const [query, setQuery] = useSearchParams();
  const name = query.get("name");
  const page = query.get("page");
  const [searchResult, setSearchResult] = useState(true);

  // 처음 로딩하면 상품리스트 
  //상품리스트 가져오기 (url쿼리 맞춰서)
  useEffect(() => {
    dispatch(productActions.getProductList({ name }));
  }, [query])

  useEffect(() => {
    //검색어나 페이지가 바뀌면 url바꿔주기 (검색어또는 페이지가 바뀜 => url 바꿔줌=> url쿼리 읽어옴=> 이 쿼리값 맞춰서  상품리스트 가져오기)

    // URLSearchParams - 객체를 쿼리로 만들어줌
    const searchQuery = {
      page: query.get("page") || 1,
      name: query.get("name") || "",
    };
    const params = new URLSearchParams(searchQuery);
    const navigateQuery = params.toString();
    console.log("qqqq바뀜!", navigateQuery);

    navigate("?" + navigateQuery);

  }, [name]);

  useEffect(() => {
    console.log("검색어에 해당하는 리스트가 없어용 ", productList);
    console.log("검색어에 해당하는 리스트가 없어용-rllen ", productList.length);
    if (productList.length == 0) {
      setSearchResult(true);
    }
    else {
      setSearchResult(false);
    }
  }, [productList])


  return (
    <>
      {
        loading ?
          (<div className='loading' > <ClipLoader color="#FB6D33" loading={loading} size={100} /></div>)
          :
          (
            searchResult ?
              (
                <div className="no-search-result">검색 결과가 없습니다.</div>
              )
              :
              (
                <Container>
                  <Row>
                    {productList?.map((product, index) =>
                      <Col key={product._id} className="card" md={3} sm={12}>
                        <ProductCard product={product} />
                      </Col>
                    )}
                  </Row >
                </Container >
              )

          )
      }
    </>

  );
};

export default ProductAll;
