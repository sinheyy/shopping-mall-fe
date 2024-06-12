import api from "../utils/api";
import * as types from "../constants/order.constants";
import { cartActions } from "./cartAction";
import { commonUiActions } from "./commonUiAction";

const createOrder = (payload, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_ORDER_REQUEST });
    const response = await api.post("/order", payload);
    if (response.status === 200) {
      // dispatch(commonUiActions.showToastMessage(`주문번호 : ${response.data.orderNum} 생성 성공~!`, "success"));
      dispatch({ type: types.CREATE_ORDER_SUCCESS, payload: response.data.orderNum });
      dispatch(cartActions.getCartQty());
      navigate("/payment/success");
    } else {
      throw new Error(response.error);
    }
  } catch (error) {
    dispatch({ type: types.CREATE_ORDER_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, "error"));
  }
};

const getOrder = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_REQUEST });
    const response = await api.get("/order/me");
    console.log("getOrder 했을 때 response!!! ", response);
    if (response.status === 200) {
      dispatch({ type: types.GET_ORDER_SUCCESS, payload: response.data });
    } else {
      throw new Error(response.error);
    }
  } catch (error) {
    dispatch({ type: types.GET_ORDER_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, "error"));
  }
};
const getOrderList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_LIST_REQUEST });
    const response = await api.get("/order", { params: { ...query } });
    if (response.status === 200) {
      dispatch({ type: types.GET_ORDER_LIST_SUCCESS, payload: response.data });
    }
  } catch (error) {
    dispatch({ type: types.GET_ORDER_LIST_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, "error"));
  }
};

const updateOrder = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_ORDER_REQUEST });
    const response = await api.put(`/order/${id}`, { status });

    if (response.status === 200) {
      dispatch({ type: types.UPDATE_ORDER_SUCCESS, payload: response.data });
      dispatch(commonUiActions.showToastMessage(`주문 상태가 ${status}로 변경되었습니다`, "success"));
      dispatch(getOrderList({ page: 1, name: "" }));
    }
    else {
      throw new Error(response.error);
    }
  } catch (error) {
    dispatch({ type: types.UPDATE_ORDER_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, "error"));
  }
};

export const orderActions = {
  createOrder,
  getOrder,
  getOrderList,
  updateOrder,
};
