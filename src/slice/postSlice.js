import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Post: {},
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.Post = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPost } = postSlice.actions;

export default postSlice.reducer;
