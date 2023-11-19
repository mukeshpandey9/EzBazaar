import {
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  CLEAR_ERRORS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_RESET,
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_SIGNUP_REQUEST:
    case LOAD_USER_REQUEST:
    case LOGOUT_REQUEST:
      return {
        loading: true,
        user: {},
      };
    case USER_LOGIN_SUCCESS:
    case USER_SIGNUP_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthanticated: true,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        user: null,
        mesg: action.payload.message,
        isAuthanticated: false,
      };
    case USER_LOGIN_FAIL:
    case USER_SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
        isAuthanticated: false,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
      };

    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
        isAuthanticated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

// U[adte user]

export const updateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading1: true,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading1: false,
        isUpdated: action.payload,
      };

    case UPDATE_USER_FAIL:
      return {
        ...state,
        loading1: false,
        error: action.payload,
      };

    case UPDATE_USER_RESET:
      return {
        ...state,
        loading1: false,
        isUpdated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        loading1: false,
        error: null,
      };

    default:
      return state;
  }
};
