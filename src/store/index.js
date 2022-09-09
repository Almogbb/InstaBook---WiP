import { configureStore } from '@reduxjs/toolkit';

import feedSlice from './feed-slice';
import usersSlice from './user-slice';

const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    feed: feedSlice.reducer,
  },
});

export default store;
