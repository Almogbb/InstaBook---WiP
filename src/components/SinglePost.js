import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { removePost } from '../store/feed-actions';
import { editPost } from '../store/feed-actions';
import { feedSliceAction } from '../store/feed-slice';
import CreateForm from './CreateForm';

import './SinglePost.scss';

function SinglePost(props) {
  const dispatch = useDispatch();
  const [isEditPost, setIsEditPost] = useState(false);
  const editTitleInputRef = useRef();
  const editContentInputRef = useRef();

  const uploadedImg = props.image;
  const postId = props._id;

  console.log(';uploadedImg', uploadedImg);
  function deletePostHandler() {
    //remove post from users database(user post array) and posts database - Done
    dispatch(removePost(postId));
  }

  function toggleEditPost() {
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
      <div>
        <img src={uploadedImg} />
      </div>
      <p>{props.content}</p>
      {isEditPost && (
        <CreateForm onClose={toggleEditPost}>
          <form className='form-container flex-col' onSubmit={editPostHandler}>
            <div className='flex'>
              <input
                placeholder='Enter your title here'
                type='text'
                name='title'
                defaultValue={props.title}
                ref={editTitleInputRef}
                className='title-input-form'
              />
            </div>
            <hr className='thin-hr' />

            <textarea
              name='content'
              className='content-input-form'
              defaultValue={props.content}
              cols='50'
              rows='10'
              ref={editContentInputRef}
            ></textarea>
            <div className='btn-container flex'>
              <button>Confirm</button>
            </div>
          </form>
        </CreateForm>
      )}
      <div className='flex'>
        <button className='btn' onClick={toggleEditPost}>
          edit
        </button>
        <button className='btn' onClick={deletePostHandler}>
          delete
        </button>
      </div>
    </article>
  );
}

export default SinglePost;
