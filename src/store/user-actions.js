import { userService } from '../services/user-service';
import { usersSliceActions } from './user-slice';

export function getUsers() {
  return async function getUsersThunk(dispatch) {
    const users = await userService.getUsers();
    // console.log('why this is working twice on load??');
    dispatch(usersSliceActions.setUsers(users));
  };
}

export function signUp(user) {
  return async function createUserThunk(dispatch) {
    // console.log('user from thunk', user);
    const createdUser = await userService.createUser(user);
    console.log('saved user after backend', createdUser);
    //after i get user - i dispatch
    dispatch(usersSliceActions.addUser(createdUser));
  };
}

export function login(user) {
  return async (dispatch) => {
    const loggedUser = await userService.login(user);
    dispatch(usersSliceActions.setLoggedInUser(loggedUser));
  };
}
