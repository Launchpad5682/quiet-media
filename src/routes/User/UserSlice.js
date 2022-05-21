import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userInformation",
  initialState: {
    username: null,
    displayName: null,
    photoURL: null,
    backgroundImageURL: null,
    bio: null,
    portfolioURL: null,
    posts: [],
    followers: [],
    following: [],
    uid: null,
    bookmarkPosts: [],
    notifications: [],
  },
  reducers: {
    setUserInformation: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUserInformation } = userSlice.actions;
export const userReducer = userSlice.reducer;
