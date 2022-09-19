import { useState, useRef, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom';

import { addPost } from '../store/feed-actions';
import SinglePost from '../components/SinglePost';
import { usersSliceActions } from '../store/user-slice';
import { utilService } from '../services/util-service';
// import { usersSliceActions } from '../store/user-slice';

import PopUpModal from '../components/UI/PopUpModal';
import Backdrop from '../components/UI/Backdrop';
import CreateForm from '../components/CreateForm';
import './Feed.scss';

function Feed() {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.users.loggedInUser);
  const users = useSelector((state) => state.users.users);
  const posts = useSelector((state) => state.feed.posts);

  const [isCreatePost, setIsCreatePost] = useState(false);

  const titleInputRef = useRef();
  const contentInputRef = useRef();

  function check() {
    // console.log(loggedUser.name);
    console.log('loggedUser from user-slice', loggedUser);
    console.log('users from user-slice', users);
    console.log('posts from feed-slice', posts);
  }

  function openCreatePost() {
    setIsCreatePost(true);
  }

  // function closeCreatePost() {
  //   setIsCreatePost(false);
  // }

  function closeCreatePostHandler() {
    setIsCreatePost(false);
    console.log(isCreatePost);
  }

  async function createPost(e) {
    e.preventDefault();

    const postTitle = titleInputRef.current.value;
    const postContent = contentInputRef.current.value;

    const post = {
      _id: utilService.makeId(),
      title: postTitle,
      content: postContent,
      createdAt: Date.now(),
      createdBy: loggedUser._id,
    };
    dispatch(addPost(post));

    setIsCreatePost(false);
  }

  function onLogoutHandler() {}

  const loggedUserPosts = users.find((user) => user._id === loggedUser._id);

  return (
    <section className='feed-container'>
      <h1 className='feed-title'>My Feed</h1>
      {loggedUser && <p>{`Hello ${loggedUser.name}`}</p>}
      <button onClick={check}>check logged in user</button>
      <button onClick={openCreatePost}>Create Post</button>
      {isCreatePost && (
        <CreateForm onClose={closeCreatePostHandler}>
          <form className='create-post-form' onSubmit={createPost}>
            <label htmlFor='title'>Title</label>
            <input type='text' name='title' ref={titleInputRef} />
            <textarea
              name='content'
              ref={contentInputRef}
              cols='50'
              rows='10'
              placeholder='What is on your mind'
            ></textarea>
            <button className='create-post-btn'>Post</button>
          </form>
        </CreateForm>
      )}
      <div className='posts-container'>
        {loggedUserPosts?.posts.map((post) => (
          <SinglePost
            key={post._id}
            _id={post._id}
            title={post.title}
            content={post.content}
            createdByUserId={post.createdByUserId}
          />
        ))}
      </div>
    </section>
  );
}

export default Feed;
