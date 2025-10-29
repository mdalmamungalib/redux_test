import postsReducer from "@/features/posts/postSlice"; 
const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;
