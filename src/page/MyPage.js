import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../action/orderAction";
import OrderStatusCard from "../component/OrderStatusCard";
import "../style/orderStatus.style.css";
import { useNavigate } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";

const MyPage = () => {
  const dispatch = useDispatch();
  const { loading, orderList } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  //오더리스트 들고오기
  useEffect(() => {
    dispatch(orderActions.getOrder());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (loading) {
    return (<div className='loading' > <ClipLoader color="#FB6D33" loading={loading} size={100} /></div>);
  }
  else {
    // 오더리스트가 없다면? 주문한 상품이 없습니다 메세지 보여주기
    if (orderList?.length === 0) {
      return (
        <Container className="no-order-box">
          <div>주문 내역이 없습니다.</div>
        </Container>
      );
    }
    else {
      return (
        <Container className="status-card-container">
          {orderList.map((item) => (
            <OrderStatusCard item={item} key={item._id} className="status-card-container" />
          ))}
        </Container>
      );
    }

  }


};

export default MyPage;
