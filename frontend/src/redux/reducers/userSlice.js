import { createSlice } from "@reduxjs/toolkit";
import {
  UserLogin,
  loadUser,
  logoutUser,
  updateProfile,
  userSignup,
  googleAuth,
  getAllUsers,
} from "../actions/userAction";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    user: {},
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    isAuthanticated: false,
    message: "",
  },
  reducers: {
    clearErrors: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
      })

      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthanticated = true;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthanticated = true;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthanticated = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthanticated = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.message = action.payload.message;
        state.isAuthanticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addMatcher(
        (action) =>
          [
            userSignup.rejected.type,
            UserLogin.rejected.type,
            googleAuth.rejected.type,
            loadUser.rejected.type,
          ].includes(action.type),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.isAuthanticated = false;
          state.token = null;
          state.user = null;
        }
      );
  },
});

// Actions
export const { clearErrors } = userReducer.actions;

export const updateProfileReducer = createSlice({
  name: "updateProfile",
  initialState: {
    loading1: true,
    isUpdated: false,
    error: null,
  },
  reducers: {
    updateUserReset(state) {
      state.loading1 = false;
      state.isUpdated = false;
    },
    clearErrors1(state) {
      state.loading1 = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading1 = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading1 = false;
        state.isUpdated = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading1 = false;
        state.error = action.payload;
      });
  },
});

// Reducer for all users

export const getAllUsersReducer = createSlice({
  name: "getAllUsers",
  initialState: {
    loading: false,
    users: [],
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Actions
export const { clearErrors: clearUserErrors } = getAllUsersReducer.actions;

export const { updateUserReset, clearErrors: clearErrors1 } =
  updateProfileReducer.actions;
