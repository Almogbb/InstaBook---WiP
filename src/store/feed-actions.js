import { feedService } from '../services/feed-service';
import { feedSliceAction } from './feed-slice';
import { usersSliceActions } from './user-slice';

export function addPost(post) {
  return async (dispatch) => {
    const addedPost = await feedService.addPost(post);
    // console.log('feed action post', addedPost);
    dispatch(feedSliceAction.updatePosts(addedPost));
    dispatch(usersSliceActions.setLoggedUserPosts(post));
  };
}
