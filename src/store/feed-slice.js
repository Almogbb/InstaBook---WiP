import { createSlice } from '@reduxjs/toolkit';

const initialFeedState = {
  posts: [],
};

const feedSlice = createSlice({
  name: 'feed',
  initialState: initialFeedState,
  reducers: {
    getPosts(state, action) {
      state.posts = action.payload;
    },
  },
});

export const feedSliceAction = feedSlice.actions;
export default feedSlice;
