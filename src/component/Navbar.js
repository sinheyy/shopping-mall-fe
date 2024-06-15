import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faBox,
  faSearch,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../action/userAction";
import * as types from "../constants/product.constants";
import { cartActions } from "../action/cartAction";

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const { cartItemQty } = useSelector((state) => state.cart);
  const isMobile = window.navigator.userAgent.indexOf("Mobile") !== -1;
  const [showSearchBox, setShowSearchBox] = useState(false);
  const menuList = [
    "WOMEN",
    "MEN",
    "BEAUTY",
    "LIFE",
    "BEST",
    "SALE",
    "NEW",
    "EXCLUSIVE",
    "EVENT",
  ];
  let [width, setWidth] = useState(0);
  let navigate = useNavigate();

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {

      if (event.target.value === "") {
        return navigate("/");
      }

      navigate(`?name=${event.target.value}`);
    }
  };

  const logout = () => {
    dispatch(userActions.logout());
    dispatch(cartActions.clearCart());
    navigate("/");
  };

  const goToLogin = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/account/purchase")
    }
  }

  return (
    <div>
      {showSearchBox && (
        <div className="display-space-between mobile-search-box w-100">
          <div className="search display-space-between w-100">
            <div>
              <FontAwesomeIcon className="search-icon" icon={faSearch} />
              <input
                type="text"
                placeholder="제품검색"
                onKeyPress={onCheckEnter}
              />
            </div>
            <button
              className="closebtn"
              onClick={() => setShowSearchBox(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <div className="side-menu" style={{ width: width }}>
        <button className="closebtn" onClick={() => setWidth(0)}>
          &times;
        </button>

        <div className="side-menu-list" id="menu-list">
          {menuList.map((menu, index) => (
            <button key={index}>{menu}</button>
          ))}
        </div>
      </div>
      {user && user.level === "admin" && (
        <Link to="/admin/product?page=1" className="link-area">
          <div>[관리자 페이지로 가기]</div>
        </Link>
      )}
      <div className="nav-header">
        <div className="burger-menu hide">
          <FontAwesomeIcon icon={faBars} onClick={() => setWidth(250)} />
        </div>

        <div>
          <div className="display-flex">
            {user ? (
              <div className="nav-icon">
                <span>{user?.name}님, 반갑습니다</span>
              </div>
            )
              :
              (<></>)
            }
            {user ? (
              <div onClick={logout} className="nav-icon">
                <FontAwesomeIcon icon={faUser} />
                {!isMobile && (
                  <span style={{ cursor: "pointer" }}>LOGOUT</span>
                )}
              </div>
            ) : (
              <div onClick={() => navigate("/login")} className="nav-icon">
                <FontAwesomeIcon icon={faUser} />
                {!isMobile && <span style={{ cursor: "pointer" }}>LOGIN</span>}
              </div>
            )}
            <div onClick={() => navigate("/cart")} className="nav-icon">
              <FontAwesomeIcon icon={faShoppingBag} />
              {!isMobile && (
                <span style={{ cursor: "pointer" }}>{`CART(${cartItemQty || 0
                  })`}</span>
              )}
            </div>
            <div
              onClick={() => goToLogin()}
              className="nav-icon"
            >
              <FontAwesomeIcon icon={faBox} />
              {!isMobile && <span style={{ cursor: "pointer" }}>MY</span>}
            </div>
            {isMobile && (
              <div className="nav-icon" onClick={() => setShowSearchBox(true)}>
                <FontAwesomeIcon icon={faSearch} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="nav-logo">
        <Link to="/">
          <img width={300} src="/image/shop_logo.png" alt="shop-logo.png" />
        </Link>
        {!isMobile && ( // admin페이지에서 같은 search-box스타일을 쓰고있음 그래서 여기서 서치박스 안보이는것 처리를 해줌
          <div className="search-box landing-search-box ">
            <input
              type="text"
              placeholder=""
              onKeyPress={onCheckEnter}
            />
            <FontAwesomeIcon icon={faSearch} />
          </div>
        )}

      </div>

      <div className="nav-menu-area">
        <ul className="menu">
          {menuList.map((menu, index) => (
            <li key={index}>
              <a href="#">{menu}</a>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default Navbar;
