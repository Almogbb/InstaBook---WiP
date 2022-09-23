import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { usersSliceActions } from '../store/user-slice';
import { signUp } from '../store/user-actions';

import './Signup.scss';

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  async function onSignupHandler(e) {
    e.preventDefault();
    const user = {
      name: nameInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      createdAt: JSON.stringify(Date.now()),
    };
    console.log('sending user to backend', user);
    await dispatch(signUp(user));
    navigate('/login');
  }

  return (
    <section className='sign-up-container flex'>
      <form className='sign-up-form' onSubmit={onSignupHandler}>
        <h1 className='sign-up-title'>Sign-up</h1>
        {/* <label htmlFor='name'>name</label> */}
        <input
          className='sign-log-input'
          name='name'
          type='text'
          ref={nameInputRef}
          placeholder='Enter your name'
        />
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
          <button className='sign-btn'>Sign-Up</button>
        </div>
      </form>
    </section>
  );
}

export default Signup;
