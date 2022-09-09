import { createSlice } from '@reduxjs/toolkit';

const initalUsersState = {
  users: [],
  loggedInUser: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState: initalUsersState,
  reducers: {},
});

export const usersSliceActions = usersSlice.actions;
export default usersSlice;
