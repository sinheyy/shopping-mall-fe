import * as types from "../constants/cart.constants";
import {
  LOGIN_SUCCESS,
  GOOGLE_LOGIN_SUCCESS,
  LOGOUT,
} from "../constants/user.constants";

const initialState = {
  loading: false,
  error: "",
  cartItemQty: 0,
  cartList: [],
  totalPrice: 0,           // 총 결제 금액(실제 총 결제 예상 금액 계산) : 총 상품 금액(totalProductPrice) - 총 할인 금액(totalSalePrice)
  totalSalePrice: 0,       // 총 할인 금액(할인된 금액 계산)
  totalProductPrice: 0     // 총 상품 금액(정상가 합)
};

function cartReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.ADD_TO_CART_REQUEST:
    case types.GET_CART_LIST_REQUEST:
    case types.DELETE_CART_ITEM_REQUEST:
    case types.UPDATE_CART_ITEM_REQUEST:
      return { ...state, loading: true };
    case types.ADD_TO_CART_SUCCESS:
      return { ...state, loading: false, cartItemQty: payload };
    case types.GET_CART_LIST_SUCCESS:
      return {
        ...state, loading: false, cartList: payload,
        totalPrice: payload.reduce(
          (total, item) => (total += item.productId.salePrice * item.qty), 0
        ),
        totalSalePrice: payload.reduce(
          (total, item) => (total += item.productId.price * item.qty - item.productId.salePrice * item.qty), 0
        ),
        totalProductPrice: payload.reduce(
          (total, item) => (total += item.productId.price * item.qty), 0
        ),
      };
    case types.DELETE_CART_ITEM_SUCCESS:
      return { ...state, loading: false, cartItemQty: payload };
    case types.UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state, loading: false, cartList: payload,
        totalPrice: payload.reduce(
          (total, item) => (total += item.productId.salePrice * item.qty), 0
        ),
        totalSalePrice: payload.reduce(
          (total, item) => (total += item.productId.price * item.qty - item.productId.salePrice * item.qty), 0
        ),
        totalProductPrice: payload.reduce(
          (total, item) => (total += item.productId.price * item.qty), 0
        ),
      };
    case types.ADD_TO_CART_FAIL:
    case types.GET_CART_LIST_FAIL:
    case types.DELETE_CART_ITEM_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}
export default cartReducer;
