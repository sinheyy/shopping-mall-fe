import * as types from "../constants/user.constants";
const initialState = {
  error: "",
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.REGISTER_USER_FAIL:
      return {
        ...state,
        error: payload
      };

    case types.REGISTER_USER_REQUEST:
      return {
        ...state,
        error: ""
      };

    default:
      return state;
  }
}

export default userReducer;
