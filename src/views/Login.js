import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from '../store/user-actions';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.users.loggedInUser);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  async function onLoginHandler(e) {
    e.preventDefault();
    const loginUser = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };
    console.log('loginUser', loginUser);
    dispatch(login(loginUser));
  }

  useEffect(() => {
    if (loggedUser) {
      console.log('loggedUser', loggedUser);

      localStorage.setItem('token', loggedUser.token);
      const user = {
        name: loggedUser.name,
        _id: loggedUser._id,
      };
      localStorage.setItem('user', JSON.stringify(user));
      //variables for setting logout
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem('expiryDate', expiryDate.toISOString());
      console.log('user will logout automatically after', expiryDate);
      // set function for auth logout after 1h
      //...
      navigate('/feed');
    }
  }, [loggedUser]);

  return (
    <section>
      <form onSubmit={onLoginHandler}>
        <label htmlFor='email'>E-mail</label>
        <input
          name='email'
          type='email'
          ref={emailInputRef}
          placeholder='Enter your E-mail'
        />
        <label htmlFor='password'>password</label>
        <input
          name='password'
          type='password'
          ref={passwordInputRef}
          placeholder='Enter your password'
        />
        <button>Login</button>
      </form>
    </section>
  );
}

export default Login;
