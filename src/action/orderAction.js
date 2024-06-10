import api from "../utils/api";
import * as types from "../constants/order.constants";
import { cartActions } from "./cartAction";
import { commonUiActions } from "./commonUiAction";

const createOrder = (payload) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_ORDER_REQUEST });
    const response = await api.post("/order", payload);
    if (response.status === 200) {
      dispatch(commonUiActions.showToastMessage(`주문번호 : ${response.data.orderNum} 생성 성공~!`, "success"));
      //dispatch({ type: types.CREATE_ORDER_SUCCESS, payload: response.data.orderNum });
    } else {
      throw new Error(response.error);
    }
  } catch (error) {
    dispatch({ type: types.CREATE_ORDER_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, "error"));
  }
};

const getOrder = () => async (dispatch) => { };
const getOrderList = (query) => async (dispatch) => { };

const updateOrder = (id, status) => async (dispatch) => { };

export const orderActions = {
  createOrder,
  getOrder,
  getOrderList,
  updateOrder,
};
