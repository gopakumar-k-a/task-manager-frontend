import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice'
// const authReducer = await import('../slice/authSlice');

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
