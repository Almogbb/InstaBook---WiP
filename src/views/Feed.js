import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addPost } from '../store/feed-actions';
import SinglePost from '../components/SinglePost';
import { usersSliceActions } from '../store/user-slice';
// import { usersSliceActions } from '../store/user-slice';

function Feed() {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.users.loggedInUser);
  const users = useSelector((state) => state.users.users);
  const posts = useSelector((state) => state.feed.posts);

  const [isCreatePost, setCreatePost] = useState(false);

  const titleInputRef = useRef();
  const contentInputRef = useRef();

  function check() {
    // console.log(loggedUser.name);
    console.log('loggedUser from user-slice', loggedUser);
    console.log('users from user-slice', users);
    console.log('posts from feed-slice', posts);
  }

  function openCreatePost() {
    setCreatePost(true);
  }

  async function createPost(e) {
    e.preventDefault();
    const postTitle = titleInputRef.current.value;
    const postContent = contentInputRef.current.value;
    console.log('titleInputRef', postTitle);
    console.log('contentInputRef', postContent);
    const post = {
      title: postTitle,
      content: postContent,
      createdAt: Date.now(),
      _id: loggedUser._id,
    };
    dispatch(addPost(post));

    setCreatePost(false);
  }

  function onLogoutHandler() {}

  const loggedUserPosts = users.find((user) => user._id === loggedUser._id);

  return (
    <section>
      <h1>feed</h1>
      {loggedUser && <p>{`Hello ${loggedUser.name}`}</p>}
      <button onClick={check}>check logged in user</button>
      <button onClick={openCreatePost}>Create Post</button>
      {isCreatePost && (
        <div>
          <form onSubmit={createPost}>
            <label htmlFor='title'>Title</label>
            <input type='text' name='title' ref={titleInputRef} />
            <textarea
              name='content'
              ref={contentInputRef}
              cols='50'
              rows='10'
              placeholder='What is on your mind'
            ></textarea>
            <button>Post</button>
          </form>
        </div>
      )}

      {loggedUserPosts?.posts.map((post) => (
        <SinglePost key={post._id} title={post.title} content={post.content} />
      ))}
    </section>
  );
}

export default Feed;
