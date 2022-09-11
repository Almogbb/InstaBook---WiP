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
      console.log('user store payload', action);
      state.loggedInUser = {
        loggedUser: action.payload.user,
        token: action.payload.token,
      };
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const usersSliceActions = usersSlice.actions;
export default usersSlice;
