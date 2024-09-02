import { createAsyncThunk } from "@reduxjs/toolkit";
import { logInApi } from "../../api/auth";
export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await logInApi(credentials);
      
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
