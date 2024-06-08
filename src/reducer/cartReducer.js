import * as types from "../constants/cart.constants";
import {
  LOGIN_SUCCESS,
  GOOGLE_LOGIN_SUCCESS,
  LOGOUT,
} from "../constants/user.constants";

const initialState = {
  loading: false,
};

function cartReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.ADD_TO_CART_REQUEST:
      return { ...state, loading: true };
    case types.ADD_TO_CART_SUCCESS:   // TO DO
      return { ...state, loading: false };
    case types.ADD_TO_CART_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}
export default cartReducer;
