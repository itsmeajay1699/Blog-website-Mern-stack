import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../slice/postSlice";
const store = configureStore({
  reducer: {
    post: postSlice,
  },
});

export default store;
