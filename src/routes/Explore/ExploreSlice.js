// import { createSlice } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

// export const exploreSlice = createSlice({
//   name: "explore",
//   initialState: { posts: [], loading: false, sortBy: null },
//   reducers: {
//     reducers: {
//       explorePostsSortBy: (state, action) => {
//         state.sortBy = action.payload;
//       },
//       setExplorePosts: (state, action) => {
//         state.posts = action.payload;
//       },
//       appendExplorePosts: (state, action) => {
//         state.posts = [...state.posts, ...action.payload];
//       },
//       startLoadingExplorePosts: (state, action) => {
//         state.loading = true;
//       },
//       stopLoadingExplorePosts: (state, action) => {
//         state.loading = false;
//       },
//     },
//   },
// });

// export const {
//   explorePostsSortBy,
//   setExplorePosts,
//   appendExplorePosts,
//   startLoadingExplorePosts,
//   stopLoadingExplorePosts,
// } = exploreSlice.actions;

// export const exploreReducer = exploreSlice.reducer;

export const exploreSlice = createSlice({
  name: "explore",
  initialState: { posts: [], loading: false, sortBy: null },
  reducers: {
    explorePostsSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setExplorePosts: (state, action) => {
      state.posts = action.payload;
    },
    startLoadingExplorePosts: (state, action) => {
      state.loading = true;
    },
    stopLoadingExplorePosts: (state, action) => {
      state.loading = false;
    },
  },
});

export const {
  explorePostsSortBy,
  setExplorePosts,
  startLoadingExplorePosts,
  stopLoadingExplorePosts,
} = exploreSlice.actions;

export const exploreReducer = exploreSlice.reducer;
