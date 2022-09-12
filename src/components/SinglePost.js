import './SinglePost.scss';

function SinglePost(props) {
  function removePost() {
    console.log('Post removed');
  }

  function editPost() {
    console.log('Post edited');
  }

  return (
    <article className='single-post-container'>
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      <div>
        <button onClick={editPost}>edit</button>
        <button onClick={removePost}>delete</button>
      </div>
    </article>
  );
}

export default SinglePost;
