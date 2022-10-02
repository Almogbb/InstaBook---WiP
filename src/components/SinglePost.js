import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { removePost } from '../store/feed-actions';
import { editPost } from '../store/feed-actions';
import { feedSliceAction } from '../store/feed-slice';
import CreateForm from './CreateForm';

import emptyHeart from '../assets/Icons/empty-heart.png';
import fullHeart from '../assets/Icons/full-heart.png';
import './SinglePost.scss';

function SinglePost(props) {
  const [isEditPost, setIsEditPost] = useState(false);
  const [isLove, setIsLove] = useState(false);

  const dispatch = useDispatch();
  const editTitleInputRef = useRef();
  const editContentInputRef = useRef();

  const postId = props._id;

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

  function toggleLove() {
    if (!isLove) {
      setIsLove(true);
      console.log('isLove', isLove);
      return;
    }
    setIsLove(false);
    console.log('isLove', isLove);
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

  const heartImg = isLove ? fullHeart : emptyHeart;
  const loveIt = isLove ? 'like-btn red' : 'like-btn';

  return (
    <article className='single-post-container'>
      <h2>{props.title}</h2>
      {props.image && (
        <div className='image-container'>
          <img src={props.image.url} alt='' />
        </div>
      )}
      <p className='post-content'>{props.content}</p>
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
      <hr className='thin-hr' />
      <div className='flex'>
        <button className='btn' onClick={toggleEditPost}>
          edit
        </button>
        <button className='btn' onClick={deletePostHandler}>
          delete
        </button>
      </div>
      <hr className='thin-hr' />
      <div className='like-container' onClick={toggleLove}>
        {/* <div className='fss'> */}
        <div className='like-image-container'>
          <img className='like-img' src={heartImg} />
        </div>
        <p className={loveIt}>Love it</p>
        {/* </div> */}
      </div>
    </article>
  );
}

export default SinglePost;
