import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { usersSliceActions } from '../store/user-slice';
import { userService } from '../services/user-service';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function guestUserHandler() {
    const guestUser = await userService.getGuestUser();
    console.log('guestUser', guestUser);
    dispatch(usersSliceActions.setLoggedInUser(guestUser));
    navigate('/feed');
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
