import { createSlice } from '@reduxjs/toolkit';

const initalUsersState = {
  users: [],
  loggedInUser: '',
  isChanged: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState: initalUsersState,
  reducers: {
    setLoggedInUser(state, action) {
      console.log('user store payload', action);
      state.loggedInUser = {
        name: action.payload.name,
        _id: action.payload._id,
        token: action.payload.token,
        posts: [],
      };
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    setLoggedUserPosts(state, action) {
      console.log('changing user state');
      state.isChanged = true;
      state.loggedInUser.posts.push(action.payload);
    },
    // getloggedUserPosts(state, action) {
    //   const userToGet = state.users.find((user) => user._id === action.payload);
    //   console.log(userToGet);
    // },
  },
});

export const usersSliceActions = usersSlice.actions;
export default usersSlice;
