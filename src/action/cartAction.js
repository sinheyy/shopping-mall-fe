import api from "../utils/api";
import * as types from "../constants/cart.constants";
import { commonUiActions } from "../action/commonUiAction";
import { responsive } from "@cloudinary/react";
const addToCart =
  ({ id, size }) =>
    async (dispatch) => {
      try {
        dispatch({ type: types.ADD_TO_CART_REQUEST });
        const response = await api.post("/cart", { productId: id, option:size, qty: 1 }); //qty는 개수
        console.log("rrrr cart r", response);
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

const getCartList = () => async (dispatch) => { };
const deleteCartItem = (id) => async (dispatch) => { };

const updateQty = (id, value) => async (dispatch) => { };
const getCartQty = () => async (dispatch) => { };
export const cartActions = {
  addToCart,
  getCartList,
  deleteCartItem,
  updateQty,
  getCartQty,
};
