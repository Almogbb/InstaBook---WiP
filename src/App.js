import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { feedService } from './services/feed-service';
// import { feedSliceAction } from './store/feed-slice';
import { usersSliceActions } from './store/user-slice';
import { getUsers } from './store/user-actions';

import MainHeader from './components/MainHeader';
import Feed from './views/Feed';
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';

import './index.scss';

function App() {
  const dispatch = useDispatch();
  const feedPosts = useSelector((state) => state.feed.posts);
  const isLoggedUser = useSelector((state) => state.users.loggedInUser);
  const navigate = useNavigate();

  // function testing() {
  //   console.log(feedPosts);
  // }

  // async function getFromBack() {
  //   const postsFromBack = await feedService.getPosts();
  //   console.log(postsFromBack);
  // }

  // useEffect(() => {
  //   return () => {
  //     console.log('done');
  //   };
  // });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, isLoggedUser, feedPosts]);
  // maybe i dont have to getUsers on start - only after user is logging in
  // need to find something instead of "isLoggedUser" to update users array after "continue with guest user"
  //, isLoggedUser

  return (
    <div>
      <MainHeader />
      <main className='main-layout'>
        {/* <button onClick={testing}>check feed posts</button>
        <button onClick={getFromBack}>check posts from back</button> */}
        <Routes>
          {<Route path='/' element={<Home />} />}
          {<Route path='/feed' element={<Feed />} />}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
