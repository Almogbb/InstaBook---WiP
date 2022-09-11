import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Feed() {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.users.loggedInUser);
  const users = useSelector((state) => state.users.users);

  const [isCreatePost, setCreatePost] = useState(false);

  const titleInputRef = useRef();
  const contentInputRef = useRef();

  function check() {
    console.log(loggedUser.loggedUser.name);
    console.log(loggedUser);
    console.log('users', users);
  }

  function openCreatePost() {
    setCreatePost(true);
  }

  function createPost(e) {
    e.preventDefault();
    console.log('titleInputRef', titleInputRef.current.value);
    console.log('contentInputRef', contentInputRef.current.value);
    setCreatePost(false);
  }

  function onlogoutHandler() {}

  return (
    <section>
      <h1>feed</h1>
      {loggedUser && <p>{`Hello ${loggedUser.loggedUser.name}`}</p>}
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
    </section>
  );
}

export default Feed;
