import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";

const loginWithToken = () => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_WITH_TOKEN_REQUEST });
    const response = await api.get("/user/me");
    if (response.status === 200) {

      dispatch({ type: types.LOGIN_WITH_TOKEN_SUCCESS, payload: response.data });

    }
    else {
      throw new Error(response.error);
    }
  } catch (error) {
    dispatch({ type: types.LOGIN_WITH_TOKEN_FAIL });
    dispatch(logout());
  }
};

const loginWithEmail = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST });
    const response = await api.post("/auth/login", { email, password });

    if (response.status === 200) {
      sessionStorage.setItem("token", response.data.token);
      dispatch({ type: types.LOGIN_SUCCESS, payload: response.data });
    }
    else {
      throw new Error(response.error);
    }
  } catch (error) {
    dispatch({ type: types.LOGIN_FAIL, payload: error.message });
  }
};

const logout = () => async (dispatch) => {
  dispatch({ type: types.LOGOUT });
  sessionStorage.removeItem("token");
};

const loginWithGoogle = (token) => async (dispatch) => {
  try {
    dispatch({ type: types.GOOGLE_LOGIN_REQUEST });
    const response = await api.post("/auth/google", { token });

    if (response.status === 200) {
      sessionStorage.setItem("token", response.data.token);
      dispatch({ type: types.GOOGLE_LOGIN_SUCCESS, payload: response.data });
    }
    else {
      throw new Error(response.error);
    }
  } catch (error) {
    dispatch({ type: types.GOOGLE_LOGIN_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, "error"));
  }
};

const registerUser = ({ email, name, password }, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_USER_REQUEST });
    const response = await api.post("/user", { email, name, password });

    if (response.status === 200) {
      dispatch({ type: types.REGISTER_USER_SUCCESS });
      dispatch(commonUiActions.showToastMessage("회원 가입에 성공했습니다!", "success"));
      navigate("/login");
    }
    else {
      throw new Error(response.error);
    }

  } catch (error) {
    dispatch({ type: types.REGISTER_USER_FAIL, payload: error.message });
  }
};

const clearError = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_ERROR_MESSAGE });
};

export const userActions = {
  loginWithToken,
  loginWithEmail,
  logout,
  loginWithGoogle,
  registerUser,
  clearError,
};
