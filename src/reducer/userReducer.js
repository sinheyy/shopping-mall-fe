import * as types from "../constants/user.constants";
const initialState = {
  loading: false,
  error: "",
  user: null
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.REGISTER_USER_REQUEST:
    case types.LOGIN_REQUEST:
    case types.LOGIN_WITH_TOKEN_REQUEST:
      return {
        ...state,
        loading: true
      };

    case types.REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: ""
      };

    case types.LOGIN_SUCCESS:
    case types.LOGIN_WITH_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        user: payload.user
      };

    case types.REGISTER_USER_FAIL:
    case types.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };

    case types.LOGIN_WITH_TOKEN_FAIL:
      return {
        ...state,
        loading: false,
      };

    case types.LOGOUT:
      return {
        ...state,
        user: null,
      };

    case types.CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        error: ""
      };

    default:
      return state;
  }
}

export default userReducer;
