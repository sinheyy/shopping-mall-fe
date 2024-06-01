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

    default:
      return state;
  }
}

export default userReducer;
