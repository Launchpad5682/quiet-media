import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: { posts: [], loading: false, sortBy: null },
  reducers: {
    postsSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    appendPosts: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    },
    updatePost: (state, action) => {
      const { post: updatedPost, _id } = action.payload;
      console.log(updatedPost, "updated post from slice");
      state.posts = state.posts.map((post) =>
        post._id === _id ? updatedPost : post
      );
    },
    deletePost: (state, action) => {
      const { _id } = action.payload;
      state.posts = state.posts.filter((post) => post._id !== _id);
    },
    startLoadingPosts: (state, action) => {
      state.loading = true;
    },
    stopLoadingPosts: (state, action) => {
      state.loading = false;
    },
  },
});

export const {
  postsSortBy,
  setPosts,
  appendPosts,
  updatePost,
  deletePost,
  startLoadingPosts,
  stopLoadingPosts,
} = homeSlice.actions;

export const homeReducer = homeSlice.reducer;
