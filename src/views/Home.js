import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { usersSliceActions } from '../store/user-slice';
import { userService } from '../services/user-service';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function guestUserHandler() {
    const guestUser = await userService.getGuestUser();
    console.log('guestUser', guestUser);
    // set token in localStorage
    localStorage.setItem('token', guestUser.token);
    localStorage.setItem('user', JSON.stringify(guestUser.user));
    //variables for setting logout
    const remainingMilliseconds = 60 * 60 * 1000;
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
    localStorage.setItem('expiryDate', expiryDate.toISOString());
    console.log('user will logout automatically after', expiryDate);
    // set function for auth logout after 1h
    //...
    dispatch(
      usersSliceActions.setLoggedInUser({
        name: guestUser.user.name,
        _id: guestUser.user._id,
        token: guestUser.token,
      })
    );

    // navigate(`/feed/:${guestUser.user._id}`);
    navigate(`/feed`);
  }

  return (
    <section>
      <div>
        <button onClick={guestUserHandler}>Continue as a guest</button>
      </div>
    </section>
  );
}

export default Home;
