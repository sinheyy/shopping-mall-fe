import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SearchBox from "../component/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../action/orderAction";
import OrderDetailDialog from "../component/OrderDetailDialog";
import OrderTable from "../component/OrderTable";
import * as types from "../constants/order.constants";
import ReactPaginate from "react-paginate";
import { useSearchParams, useNavigate } from "react-router-dom";
import { commonUiActions } from "../action/commonUiAction";
import ClipLoader from "react-spinners/ClipLoader";

const AdminOrderPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.order.orderList);
  const { loading } = useSelector((state) => state.order);
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    ordernum: query.get("ordernum") || "",
  });
  const [open, setOpen] = useState(false);
  const totalPageNum = useSelector((state) => state.order.totalPageNum);
  const tableHeader = [
    "#",
    "주문번호",
    "주문날짜",
    "주문자",
    "주문 상품",
    "받는분",
    "주소",
    "결제 금액",
    "주문상태",
  ];

  useEffect(() => {
    dispatch(orderActions.getOrderList({ ...searchQuery }));
  }, [query]);

  useEffect(() => {
    if (searchQuery.ordernum === "") {
      delete searchQuery.ordernum;
    }
    const params = new URLSearchParams(searchQuery);
    const queryString = params.toString();

    navigate("?" + queryString);
  }, [searchQuery]);

  const openEditForm = (order) => {
    setOpen(true);
    dispatch({ type: types.SET_SELECTED_ORDER, payload: order });
  };

  const handlePageClick = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="locate-center">
      <Container>
        <div className="mt-2 display-center mb-2">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="주문번호"
            field="ordernum"
          />
        </div>

        {loading ?
          (
            <div className='loading'><ClipLoader color="#FB6D33" loading={loading} size={100} /></div>
          )
          :
          (
            <OrderTable
              header={tableHeader}
              data={orderList}
              openEditForm={openEditForm}
            />
          )
        }

        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPageNum}
          forcePage={searchQuery.page - 1}
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

      {open && <OrderDetailDialog open={open} handleClose={handleClose} />}
    </div>
  );
};

export default AdminOrderPage;
