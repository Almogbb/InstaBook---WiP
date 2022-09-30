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
    setUsers(state, action) {
      state.users = action.payload;
      console.log('all users in the state', state.users);
    },
    setLoggedInUser(state, action) {
      const loggedUser = action.payload;

      state.loggedInUser = {
        token: loggedUser.token || '',
        name: loggedUser.loadedUser?.name || loggedUser.name,
        email: loggedUser.loadedUser?.email || loggedUser.email,
        _id: loggedUser.loadedUser?._id || loggedUser._id,
        // createdAt: loggedUser.loadedUser.createdAt,
        posts: loggedUser.posts || [],
      };
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
