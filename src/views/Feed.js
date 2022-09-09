import { useSelector } from 'react-redux';

function Feed() {
  const feedPosts = useSelector((state) => state.feed);

  function check() {
    console.log(feedPosts);
  }
  return (
    <section>
      <h1>feed</h1>
      <p></p>
    </section>
  );
}

export default Feed;
