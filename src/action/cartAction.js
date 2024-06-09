import api from "../utils/api";
import * as types from "../constants/cart.constants";
import { commonUiActions } from "../action/commonUiAction";
import { responsive } from "@cloudinary/react";
const addToCart =
  ({ id, size }) =>
    async (dispatch) => {
      try {
        dispatch({ type: types.ADD_TO_CART_REQUEST });
        const response = await api.post("/cart", { productId: id, option: size, qty: 1 }); //qty는 개수
        if (response.status === 200) {
          dispatch({ type: types.ADD_TO_CART_SUCCESS, payload: response.data.cartItemQty });
          dispatch(commonUiActions.showToastMessage("장바구니에 상품이 추가되었습니다!", "success"));
        }
        else {
          throw new Error(response.error);
        }
      } catch (error) {
        dispatch({ type: types.ADD_TO_CART_FAIL, payload: error.message });
        dispatch(commonUiActions.showToastMessage(error.message, "error"));
      }
    };

const getCartList = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CART_LIST_REQUEST });
    const response = await api.get("/cart");
    console.log("cart List 불러오기 ", response);

    if (response.status === 200) {
      dispatch({ type: types.GET_CART_LIST_SUCCESS, payload: response.data.data });
    }
    else {
      throw new Error(response.error);
    }
  } catch (error) {
    dispatch({ type: types.GET_CART_LIST_FAIL, payload: error.message });
  }
};
const deleteCartItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_CART_ITEM_REQUEST });
    const response = await api.delete(`/cart/${id}`);

    dispatch({ type: types.DELETE_CART_ITEM_SUCCESS, payload: response.data.cartItemQty });
    dispatch(commonUiActions.showToastMessage("상품이 성공적으로 삭제되었습니다.", "success"));
    dispatch(getCartList());

  } catch (error) {
    dispatch({ type: types.DELETE_CART_ITEM_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, "error"));
  }
};

const updateQty = (id, value) => async (dispatch) => { };
const getCartQty = () => async (dispatch) => { };
export const cartActions = {
  addToCart,
  getCartList,
  deleteCartItem,
  updateQty,
  getCartQty,
};
