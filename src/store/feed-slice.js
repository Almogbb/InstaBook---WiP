import { createSlice } from '@reduxjs/toolkit';

const initialFeedState = {
  // posts will be 2 posts less bacause of dummy guest user posts (need to insert to DB)
  posts: [],
};

const feedSlice = createSlice({
  name: 'feed',
  initialState: initialFeedState,
  reducers: {
    getPosts(state, action) {
      state.posts = action.payload;
    },
    updatePosts(state, action) {
      console.log('posts state', state.posts);
      console.log('action.payload', action.payload);
      state.posts.push(action.payload);
    },
  },
});

export const feedSliceAction = feedSlice.actions;
export default feedSlice;
