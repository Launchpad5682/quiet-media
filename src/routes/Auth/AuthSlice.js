import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    authenticated: false,
    user: { displayName: null, uid: null, photoURL: null, email: null },
  },
  reducers: {
    updateAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    updateUserData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { updateAuthenticated, updateUserData } = authSlice.actions;
export const authReducer = authSlice.reducer;
