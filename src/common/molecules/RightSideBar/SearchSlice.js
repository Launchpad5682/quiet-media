import { createSlice } from "@reduxjs/toolkit";

export const SearchSlice = createSlice({
  name: "search",
  initialState: {
    search: false,
    profiles: [],
  },
  reducers: {
    setProfiles: (state, action) => {
      state.search = action.payload.search;
      state.profiles = action.payload.profiles;
    },
    appendProfiles: (state, action) => {
      state.profiles.push(...action.payload.profiles);
    },
  },
});

export const { setProfiles, appendProfiles } = SearchSlice.actions;

export const searchReducer = SearchSlice.reducer;
