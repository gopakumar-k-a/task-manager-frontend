import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk } from "../thunk/authThunk";
import { toast } from "react-toastify";
const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialUser,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
      toast.error("logged out");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const user = action.payload;
        state.user = user;
        localStorage.setItem("user", JSON.stringify(user));
        toast.success(" login success");
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
