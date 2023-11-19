import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosConfig from "../../Hooks/api/axiosConfig";
import setAuthToken from "../../Hooks/api/setAuthToken";

export const register = createAsyncThunk(
  "auth/register",
  async (student, { dispatch, state }) => {
    try {
      const response = await axiosConfig.post(
        `/api/auth/register`,
        student
      );

      console.log(response);

      const data = response.data;

      if (data.success) {
        if (data) {
          return data;
        }
      } 

    } catch (error) {
      console.log(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { dispatch, state }) => {
    try {
      const response = await axiosConfig.post(`api/auth/login`, credentials);
      const data = response.data;



      if (data.success && data && data.access_token) {
        localStorage.setItem("token", data.access_token);
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser", async () => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const response = await axiosConfig.post(`api/auth/access-token-panel`, {
        token: localStorage.token,
      });
      const data = response.data;
      console.log("success", response.data.success);
      if (response.data.success) {
        if (data) {
          return data;
        }
      } else {
        console.log(
          "Üyelik Bitti",
          "Lütfen satış danışmanınızla iletişime geçiniz"
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    localStorage.removeItem("token");
    return {
      token: null,
      isAuthenticated: false,
      loading: false,
    };
  } catch (error) { }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
  },
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => action.payload,
    [logout.fulfilled]: (state, action) => action.payload,
    [loadUser.fulfilled]: (state, action) => action.payload,
  },
});

export default authSlice.reducer;
