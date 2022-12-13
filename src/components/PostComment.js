import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addComment } from '../store/feed-actions';

import { utilService } from '../services/util-service';

function PostComment(props) {
  const loggedUser = useSelector((state) => state.users.loggedInUser);
  const dispatch = useDispatch();

  const commentInputRef = useRef();

  function createComment(e) {
    e.preventDefault();

    try {
      const commentInput = commentInputRef.current.value;
      const commentToAdd = {
        postId: props.postId,
        responderName: loggedUser.name,
        responderId: loggedUser._id,
        commentContent: commentInput,
        _commentId: utilService.makeId(),
      };
      dispatch(addComment(commentToAdd));
      commentInputRef.current.value = '';
      // close the comment tab - need to pass isCommentOpen from SinglePost
    } catch (err) {
      console.log(err);
    }

    // is it ok to change the current.value of a ref??
  }

  return (
    <div>
      <hr className='thin-hr' />
      <div>
        <form onSubmit={createComment}>
          <input
            type='text'
            name='comment'
            ref={commentInputRef}
            placeholder='Write your comment...'
          />
          <div>
            <button>Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostComment;
