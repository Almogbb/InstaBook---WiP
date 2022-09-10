import { useSelector } from 'react-redux';

function Feed() {
  const loggedUser = useSelector((state) => state.users.loggedInUser);
  const users = useSelector((state) => state.users.users);

  function check() {
    console.log(loggedUser);
    console.log(loggedUser.name);
    console.log('users', users);
  }

  return (
    <section>
      <h1>feed</h1>
      <p>{`Hello ${loggedUser.name}`}</p>
      <button onClick={check}>check logged in user</button>
    </section>
  );
}

export default Feed;
