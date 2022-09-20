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
      console.log('setting logged user', action);
      state.loggedInUser = {
        name: action.payload.name,
        _id: action.payload._id,
        token: action.payload.token,
        posts: [],
      };
      // state.loggedInUser.push()
    },
    setUsers(state, action) {
      state.users = action.payload;
      console.log('all users in the state', state.users);
    },
    addUser(state, action) {
      const userToAdd = action.payload;
      console.log('userToAdd', userToAdd);
      state.users.push({ _id: userToAdd._id, name: userToAdd.name });
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
