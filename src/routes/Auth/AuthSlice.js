import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    loading: true,
    authenticated: false,
    user: { displayName: null, uid: null, photoURL: null, email: null },
  },
  reducers: {
    updateAuthenticated: (state, action) => {
      state.authenticated = action.payload.authenticated;
      state.loading = action.payload.loading;
    },
    updateUserData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { updateAuthenticated, updateUserData } = authSlice.actions;
export const authReducer = authSlice.reducer;
