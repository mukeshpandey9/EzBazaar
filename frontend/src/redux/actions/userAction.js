import API from "../../utils/API";
import {
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  CLEAR_ERRORS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
} from "../constants/userConstants";

// Login Action

export const UserLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: { "Content-type": "application/json" },
      withCredentials: true,
    };
    const { data } = await API.post(
      `/api/v1/login`,
      { email, password },

      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data.message });
  }
};

//   Register new user

export const userSignup =
  (name, email, password, avatar) => async (dispatch) => {
    try {
      dispatch({ type: USER_SIGNUP_REQUEST });
      const config = {
        headers: { "Content-type": "multipart/form-data" },
        withCredentials: true,
      };
      const { data } = await API.post(
        `/api/v1/register`,
        {
          name,
          email,
          password,
          avatar,
        },

        config
      );
      dispatch({ type: USER_SIGNUP_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: USER_SIGNUP_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//   Update  user profile

export const updateProfile = (name, avatar) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    const config = {
      headers: { "Content-type": "multipart/form-data" },
      withCredentials: true,
    };
    const { data } = await API.put(
      `/api/v1/profile/update`,
      { name, avatar },
      config
    );
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load user

export const loadUser = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true, // Include this for requests requiring credentials
    };
    dispatch({ type: LOAD_USER_REQUEST });
    console.log(process.env.REACT_APP_BASE_URL);
    const { data } = await API.get(`/api/v1/profile`, config);
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Logout user

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });
    const config = {
      withCredentials: true, // Include this for requests requiring credentials
    };
    const { data } = await API.get(`/api/v1/logout`, config);
    dispatch({ type: LOGOUT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//   Clearing errors

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
