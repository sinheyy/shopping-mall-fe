import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Col, Row } from "react-bootstrap";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import ToastMessage from "../component/ToastMessage";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../action/userAction";
import Footer from "../component/Footer";
import { cartActions } from "../action/cartAction";
import PopupDialog from "../component/PopupDialog";

const AppLayout = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(true);
  const { user } = useSelector((state) => state.user);

  const showDialog = () => {
    setShowPopup(true);
  }

  const handleClose = () => {
    setShowPopup(false);
  }


  // 처음에 UI가 로딩이 될 때, 토큰으로 로그인해주세요
  useEffect(() => {
    dispatch(userActions.loginWithToken());
    setShowPopup(true);
    dispatch(cartActions.getCartQty());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(cartActions.getCartQty());
    }
  }, [user, dispatch]);

  return (
    <>
      <div>

        <ToastMessage />
        {showPopup && (
          <PopupDialog showDialog={showDialog} handleClose={handleClose} />
        )}
        {location.pathname.includes("admin") ? (
          <Row className="vh-100">
            <Col xs={12} md={3} className="sidebar mobile-sidebar">
              <Sidebar />
            </Col>
            <Col xs={12} md={9}>
              {children}
            </Col>
          </Row>
        ) : (
          <>
            <Navbar user={user} />
            {children}
            <Footer />
          </>
        )}

      </div>


    </>
  );
};

export default AppLayout;
