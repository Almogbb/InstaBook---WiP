import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addPost } from '../store/feed-actions';
import SinglePost from '../components/SinglePost';
import { usersSliceActions } from '../store/user-slice';
import { utilService } from '../services/util-service';

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
  const imageInputRef = useRef();

  const loggedUserPosts = users.find((user) => user._id === loggedUser._id);

  function check() {
    // console.log(loggedUser.name);
    console.log('users from user-slice', users);
    console.log('loggedUser from user-slice', loggedUser);
    // console.log('posts from feed-slice', posts);
    console.log('loggedUserPosts', loggedUserPosts);
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
    // const attachImage = imageInputRef.click;

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

  async function uploadImg(ev) {
    const UPLOAD_PRESET = 'cajan_22';
    const CLOUD_NAME = 'cajan22a';
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const FORM_DATA = new FormData();

    FORM_DATA.append('file', ev.target.files[0]);
    FORM_DATA.append('upload_preset', UPLOAD_PRESET);
    return fetch(UPLOAD_URL, {
      method: 'POST',
      body: FORM_DATA,
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => console.error(err));
  }

  function onLogoutHandler() {}

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const expiryDate = localStorage.getItem('expiryDate');
  //   if (!token || !expiryDate) {
  //     return;
  //   }
  //   const user = JSON.parse(localStorage.getItem('user'));

  //   // if (new Date(expiryDate) <= new Date()) {
  //   // need to logout the loggedInUser - set in store
  //   //   this.logoutHandler();
  //   //   return;
  //   // }
  //   const loggedUser = {
  //     name: user.name,
  //     _id: user._id,
  //     token,
  //   };
  //   const remainingMilliseconds =
  //     new Date(expiryDate).getTime() - new Date().getTime();
  //   dispatch(usersSliceActions.setLoggedInUser(loggedUser));
  //   // set function which auto logout after (remainingMilliseconds)
  //   // if (isLoggedUser) {
  //   //   console.log('isLoggedUser is true', isLoggedUser);
  //   //   navigate('/feed');
  //   //   return;
  //   // }
  // }, [dispatch]);

  return (
    <section className='feed-container'>
      <h1 className='feed-title'>My Feed</h1>
      {loggedUser && <p>{`Hello ${loggedUser.name}`}</p>}
      <button onClick={check}>check logged in user</button>
      <button onClick={openCreatePost}>Create Post</button>
      {isCreatePost && (
        <CreateForm onClose={closeCreatePostHandler}>
          <form className='form-container flex-col' onSubmit={createPost}>
            <div className='flex'>
              <input
                type='text'
                name='title'
                ref={titleInputRef}
                placeholder='Enter your title here'
                className='title-input-form'
              />
            </div>
            <hr className='thin-hr' />
            <textarea
              name='content'
              ref={contentInputRef}
              cols='50'
              rows='10'
              placeholder='What is on your mind'
              className='content-input-form'
            ></textarea>
            <div>
              <input type='file' ref={imageInputRef} hidden />
              <button onClick={imageInputRef.click}>pick img</button>
            </div>
            <div className='btn-container flex'>
              <button className='create-post-btn'>Post</button>
            </div>
          </form>
        </CreateForm>
      )}
      <div className='posts-container'>
        {loggedUserPosts?.posts?.map((post) => (
          <SinglePost
            key={post._id}
            _id={post._id}
            title={post.title}
            content={post.content}
            createdByUserId={post.createdByUserId}
          />
        ))}
        {/* {!loggedUser.posts.length && (
          <h1>No posts to show - need to show cmp for no posts</h1>
        )} */}
      </div>
    </section>
  );
}

export default Feed;
