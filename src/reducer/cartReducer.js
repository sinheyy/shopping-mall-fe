import * as types from "../constants/cart.constants";
import {
  LOGIN_SUCCESS,
  GOOGLE_LOGIN_SUCCESS,
  LOGOUT,
} from "../constants/user.constants";

const initialState = {
  loading: false,
  errpr: "",
  cartItemQty: 0,
  cartList: [],
  totalPrice: 0
};

function cartReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.ADD_TO_CART_REQUEST:
    case types.GET_CART_LIST_REQUEST:
      return { ...state, loading: true };
    case types.ADD_TO_CART_SUCCESS:
      return { ...state, loading: false, cartItemQty: payload };
    case types.GET_CART_LIST_SUCCESS:
      return {
        ...state, loading: false, cartList: payload, totalPrice: payload.reduce(
          (total, item) => (total += item.productId.salePrice * item.qty), 0
        )
      };
    case types.ADD_TO_CART_FAIL:
    case types.GET_CART_LIST_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}
export default cartReducer;
