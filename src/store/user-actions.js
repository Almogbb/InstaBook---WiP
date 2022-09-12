import { userService } from '../services/user-service';
import { usersSliceActions } from './user-slice';

export function getUsers() {
  return async function getUsersThunk(dispatch) {
    const users = await userService.getUsers();
    console.log('why this is working twice on load??');
    dispatch(usersSliceActions.setUsers(users));
  };
}

export function createUser(user) {
  return async function createUserThunk(dispatch) {
    // console.log('user from thunk', user);
    const savedUser = await userService.createUser(user);
    console.log('saved user after backend', savedUser);
    //after i get user - i dispatch
    // dispatch(usersSlice.actions.setUsers(savedUser));
  };
}
