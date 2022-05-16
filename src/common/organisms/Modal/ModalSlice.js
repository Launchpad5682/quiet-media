import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: { type: null, edit: false, _id: null },
  reducers: {
    setModal: (state, action) => {
      return action.payload;
    },
    clearModal: (state, action) => {
      state.type = null;
      state.edit = false;
      state._id = null;
    },
  },
});

export const { setModal, clearModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
