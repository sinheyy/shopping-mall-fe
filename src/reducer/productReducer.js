import * as types from "../constants/product.constants";
const initialState = {
  loading: false,
  error: "",
  productList: [],
  totalPageNum: 1,
  searchKeyword: ""
};

function productReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.PRODUCT_CREATE_REQUEST:
    case types.PRODUCT_GET_REQUEST:
      return { ...state, loading: true };
    case types.PRODUCT_CREATE_SUCCESS:
      return { ...state, loading: false, error: "" };
    case types.PRODUCT_GET_SUCCESS:
      return { ...state, loading: false, error: "", productList: payload.data, totalPageNum: payload.totalPageNum };
    case types.PRODUCT_CREATE_FAIL:
    case types.PRODUCT_GET_FAIL:
      return { ...state, loading: false, error: payload };
    case types.SET_SEARCH_KEYWORD:
      console.log("paydloasdfs", payload);
      return { ...state, searchKeyword: payload };
    default:
      return state;
  }
}

export default productReducer;
