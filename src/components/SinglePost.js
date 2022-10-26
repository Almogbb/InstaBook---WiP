import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { editPost, isLoveStatus, removePost } from '../store/feed-actions';
import { feedSliceAction } from '../store/feed-slice';
import CreateForm from './CreateForm';
import PostComment from './PostComment';

import emptyHeart from '../assets/Icons/empty-heart.png';
import fullHeart from '../assets/Icons/full-heart.png';
import commentIcon from '../assets/Icons/comment.png';
import editIcon from '../assets/Icons/edit-icon.png';
import deleteIcon from '../assets/Icons/delete-icon.png';
import './SinglePost.scss';

function SinglePost(props) {
  const [isEditPost, setIsEditPost] = useState(false);
  const [isLove, setIsLove] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  // console.log(isLove);

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
    if (isLove) {
      setIsLove(false);
      return false;
    }
    setIsLove(true);
    return true;
  }

  function toggleComment() {
    if (isCommentOpen) {
      setIsCommentOpen(false);
      return;
    }
    setIsCommentOpen(true);
    return;
  }

  async function isLoveHandler() {
    const isPostLove = toggleLove();
    // console.log('isLove', isLove);
    // console.log('isPostLove', isPostLove);
    // dispatch for saving in db
    const islovePost = {
      _id: postId,
      isLove: isPostLove,
    };

    dispatch(isLoveStatus(islovePost));
  }

  async function editPostHandler(e) {
    e.preventDefault();

    const postToEdit = {
      _id: postId,
      title: editTitleInputRef.current.value,
      content: editContentInputRef.current.value,
      isLove,
      updatedAt: Date.now(),
    };

    // console.log('postToEdit', postToEdit);
    dispatch(editPost(postToEdit));
    setIsEditPost(false);
  }

  function displayDate() {
    const now = new Date();
    const createdAt = new Date(props.createdAt);
    // console.log('post created at -', createdAt);
    // console.log('current time - ', now);

    let timePassed;
    let minSinceCreated = Math.abs(now.getMinutes() - createdAt.getMinutes());
    let hourSinceCreated = Math.abs(now.getHours() - createdAt.getHours());
    let dateSinceCreated = Math.abs(now.getDate() - createdAt.getDate());

    // console.log('minSinceCreated', minSinceCreated);
    // console.log('hourSinceCreated', hourSinceCreated);
    // console.log('dateSinceCreated', dateSinceCreated);
    if (dateSinceCreated) {
      timePassed = dateSinceCreated;
      if (dateSinceCreated === 1) return `${timePassed} day ago`;
      else return `${timePassed} days ago`;
    }

    if (hourSinceCreated) {
      timePassed = hourSinceCreated;
      if (hourSinceCreated === 1) return `${timePassed} hour ago`;
      else return `${timePassed} hours ago`;
    }

    if (minSinceCreated) {
      timePassed = minSinceCreated;
      if (minSinceCreated === 1) return `${timePassed} minute ago`;
      else return `${timePassed} minutes ago`;
    } else {
      return `now`;
    }
  }

  const createdDate = displayDate();
  const heartImg = props.isLove ? fullHeart : emptyHeart;
  const redColor = props.isLove ? 'like-btn red' : 'like-btn';

  return (
    <article className='single-post-container'>
      <div className='created-by-container'>
        <div className='created-by-layout'>
          <h3>{props.createdByUserName}</h3>
          <p>{createdDate}</p>
        </div>
        <div className='member-avatar'></div>
      </div>
      <h2>{props.title}</h2>
      <p className='post-content'>{props.content}</p>
      {props.image && (
        <div className='image-container'>
          <img src={props.image.url} alt='' />
        </div>
      )}
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
          <img className='edit-btn-icon' src={editIcon} alt='' />
          edit
        </button>
        <button className='btn' onClick={deletePostHandler}>
          <img className='delete-btn-icon' src={deleteIcon} alt='' />
          delete
        </button>
      </div>
      <hr className='thin-hr' />
      <div className='post-options-container'>
        <div onClick={toggleComment} className='comment-container'>
          <div className='comment-img-container'>
            <img className='comment-img' src={commentIcon} alt='' />
          </div>
          <p className='comment-btn'>Comment</p>
        </div>
        <div className='like-container' onClick={isLoveHandler}>
          <div className='like-img-container'>
            <img className='like-img' src={heartImg} alt='' />
          </div>
          <p className={redColor}>Love it</p>
        </div>
      </div>
      {isCommentOpen && <PostComment postId={props._id} />}
    </article>
  );
}

export default SinglePost;
