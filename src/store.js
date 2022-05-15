import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./routes/Auth/AuthSlice";

export const store = configureStore({
  reducer: {
    authentication: authReducer,
  },
});
