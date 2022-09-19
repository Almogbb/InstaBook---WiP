import { feedService } from '../services/feed-service';
import { feedSliceAction } from './feed-slice';
import { usersSliceActions } from './user-slice';

export function addPost(post) {
  return async (dispatch) => {
    const addedPost = await feedService.addPost(post);
    // console.log('feed action post', addedPost);
    dispatch(feedSliceAction.addPost(addedPost));
    dispatch(usersSliceActions.setLoggedUserPosts(post));
  };
}

export function removePost(postId) {
  return async (dispatch) => {
    const removedPost = await feedService.removePostById(postId);
    console.log('post removed', removedPost);
    //update posts array in feed-slice(store) and set posts and dependancy for getUsers - Done
    dispatch(feedSliceAction.removePost(postId));
  };
}

export function editPost(post) {
  return async (dispatch) => {
    const editedPost = await feedService.editPost(post);
    console.log('feed-action', editedPost);
    //update posts array in feed-slice(store)
    dispatch(feedSliceAction.updatePost(editedPost));

    //and set posts and dependancy for getUsers - ??
  };
}
