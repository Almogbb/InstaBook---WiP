import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from '../store/user-actions';

import './Login.scss';

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

  function navigateToSignup() {
    navigate('/signup');
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
    <section className='sign-up-container flex'>
      <form className='sign-up-form' onSubmit={onLoginHandler}>
        <h1 className='sign-up-title'>Log-in</h1>
        {/* <label htmlFor='email'>E-mail</label> */}
        <input
          className='sign-log-input'
          name='email'
          type='email'
          ref={emailInputRef}
          placeholder='Enter your E-mail'
        />
        {/* <label htmlFor='password'>password</label> */}
        <input
          className='sign-log-input'
          name='password'
          type='password'
          ref={passwordInputRef}
          placeholder='Enter your password'
        />
        <div className='sign-up-btn-container btn-container flex'>
          <button className='sign-btn'>Login</button>
        </div>
        <div className='btn-container'>
          <button className='new-account-btn' onClick={navigateToSignup}>
            Create new account
          </button>
        </div>
      </form>
    </section>
  );
}

export default Login;
