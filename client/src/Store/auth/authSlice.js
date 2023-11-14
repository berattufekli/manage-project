import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosConfig from "../../Hooks/api/axiosConfig";
import axios from "axios";

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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
  },
  reducers: {},
  extraReducers: {

  },
});

export default authSlice.reducer;
