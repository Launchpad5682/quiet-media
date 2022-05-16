import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: { type: null, edit: false },
  reducers: {
    setModal: (state, action) => {
      return action.payload;
    },
    clearModal: (state, action) => {
      state.type = null;
      state.edit = false;
    },
  },
});

export const { setModal, clearModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
