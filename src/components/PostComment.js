import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addComment } from '../store/feed-actions';

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
        comment: commentInput,
      };
      dispatch(addComment(commentToAdd));
      commentInputRef.current.value = '';
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
        </form>
      </div>
    </div>
  );
}

export default PostComment;
