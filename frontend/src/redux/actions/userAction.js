import API from "../../utils/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

// User Login
export const UserLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      const { data } = await API.post(
        "/api/v1/login",
        { email, password },
        config
      );
      if (data && data?.success) {
        localStorage.setItem("token", data?.token);
        return data;
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// User Signup
export const userSignup = createAsyncThunk(
  "user/signup",
  async ({ name, email, password, avatar }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "multipart/form-data" },
      };
      const { data } = await API.post(
        "/api/v1/register",
        { name, email, password, avatar },
        config
      );
      if (data && data?.success) {
        localStorage.setItem("token", data?.token);
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Login with Google
export const googleAuth = createAsyncThunk(
  "auth/google",
  async ({ name, email, avatar }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      const { data } = await API.post(
        "/api/v1/auth/google",
        { name, email, avatar },
        config
      );
      if (data && data?.success) {
        localStorage.setItem("token", data?.token);
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Update User Profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ name, avatar }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "multipart/form-data" },
      };
      const { data } = await API.put(
        "/api/v1/profile/update",
        { name, avatar },
        config
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Load User
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/api/v1/profile");
      return data;
    } catch (error) {
      localStorage.clear();
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/api/v1/logout");
      localStorage.clear();
      return data;
    } catch (error) {
      localStorage.clear();
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
