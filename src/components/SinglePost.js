import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { removePost } from '../store/feed-actions';
import { editPost } from '../store/feed-actions';
import { feedSliceAction } from '../store/feed-slice';
import './SinglePost.scss';

function SinglePost(props) {
  const dispatch = useDispatch();
  const [isEditPost, setIsEditPost] = useState(false);
  const editTitleInputRef = useRef();
  const editContentInputRef = useRef();

  const postId = props._id;

  function deletePostHandler() {
    //remove post from users database(user post array) and posts database - Done
    dispatch(removePost(postId));
  }

  function openEditPost() {
    if (isEditPost) {
      return setIsEditPost(false);
    }
    setIsEditPost(true);
  }

  async function editPostHandler(e) {
    e.preventDefault();

    const postToEdit = {
      _id: postId,
      title: editTitleInputRef.current.value,
      content: editContentInputRef.current.value,
      updatedAt: Date.now(),
    };

    // console.log('postToEdit', postToEdit);
    dispatch(editPost(postToEdit));
    setIsEditPost(false);
  }

  return (
    <article className='single-post-container'>
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      {isEditPost && (
        <div>
          <form onSubmit={editPostHandler}>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              defaultValue={props.title}
              ref={editTitleInputRef}
            />
            <textarea
              name='content'
              defaultValue={props.content}
              cols='50'
              rows='10'
              ref={editContentInputRef}
            ></textarea>
            <button>Confirm</button>
          </form>
        </div>
      )}
      <div>
        <button onClick={openEditPost}>edit</button>
        <button onClick={deletePostHandler}>delete</button>
      </div>
    </article>
  );
}

export default SinglePost;
