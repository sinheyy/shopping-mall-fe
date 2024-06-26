import api from "../utils/api";
import * as types from "../constants/product.constants";
import { commonUiActions } from "./commonUiAction";

const getProductList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_GET_REQUEST });
    const response = await api.get("/product", {
      params: { ...query }    // 검색 조건을 보냄
    });
    dispatch({ type: types.PRODUCT_GET_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.PRODUCT_GET_FAIL, payload: error.message });
  }
};

const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_PRODUCT_DETAIL_REQUEST });
    const response = await api.get(`/product/${id}`);

    dispatch({ type: types.GET_PRODUCT_DETAIL_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: types.GET_PRODUCT_DETAIL_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, "error"));
  }
};

const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_CREATE_REQUEST });
    const response = await api.post("/product", formData);

    if (response.status === 200) {
      dispatch({ type: types.PRODUCT_CREATE_SUCCESS });
      dispatch(commonUiActions.showToastMessage("상품이 추가되었습니다!", "success"));
      dispatch(getProductList({ page: 1, name: "" }));
    }
    else {
      throw new Error(response.error);
    }
  } catch (error) {
    dispatch({ type: types.PRODUCT_CREATE_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, "error"));
  }
};

const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_DELETE_REQUEST });
    const response = await api.delete(`/product/${id}`);

    dispatch({ type: types.PRODUCT_DELETE_SUCCESS });
    dispatch(commonUiActions.showToastMessage("상품이 성공적으로 삭제되었습니다.", "success"));
    dispatch(getProductList({ page: 1 }));

  } catch (error) {
    dispatch({ type: types.PRODUCT_DELETE_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, "error"));
  }
};

const editProduct = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_EDIT_REQUEST });
    const response = await api.put(`/product/${id}`, formData);
    if (response.status === 200) {
      dispatch({ type: types.PRODUCT_EDIT_SUCCESS, payload: response.data.data });
      dispatch(commonUiActions.showToastMessage("상품 정보가 수정되었습니다!", "success"));
      dispatch(getProductList({ page: 1, name: "" }));
    }
    else {
      throw new Error(response.error);
    }
  } catch (error) {
    dispatch({ type: types.PRODUCT_EDIT_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, "error"));
  }
};

export const productActions = {
  getProductList,
  createProduct,
  deleteProduct,
  editProduct,
  getProductDetail,
};
