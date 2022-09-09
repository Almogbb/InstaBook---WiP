import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { feedService } from './services/feed-service';

import { feedSliceAction } from './store/feed-slice';

import MainHeader from './components/MainHeader';
import Feed from './views/Feed';

import './index.css';

function App() {
  const dispatch = useDispatch();
  const feedPosts = useSelector((state) => state.feed.posts);

  // const test = {
  //   post: 1,
  //   user: 2,
  // };

  function testing() {
    console.log(feedPosts);
  }

  async function getFromBack() {
    const postsFromBack = await feedService.getPosts();
    console.log(postsFromBack);
  }

  // useEffect(() => {
  //   dispatch(feedSliceAction.getPosts(test));
  // }, [dispatch]);

  return (
    <div>
      <MainHeader />
      <main className='main-layout'>
        <h1>Hello</h1>
        <button onClick={testing}>check feed posts</button>
        <button onClick={getFromBack}>check posts from back</button>
        <Feed />
      </main>
    </div>
  );
}

export default App;
