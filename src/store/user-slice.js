import { createSlice } from '@reduxjs/toolkit';

const initalUsersState = {
  users: [],
  loggedInUser: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState: initalUsersState,
  reducers: {
    setLoggedInUser(state, action) {
      state.loggedInUser = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const usersSliceActions = usersSlice.actions;
export default usersSlice;
