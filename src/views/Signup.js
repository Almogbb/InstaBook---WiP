import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { usersSliceActions } from '../store/user-slice';
import { createUser } from '../store/user-actions';

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
    await dispatch(createUser(user));
    navigate('/login');
    // navigate('/feed');
  }

  return (
    <section>
      <form onSubmit={onSignupHandler}>
        <label htmlFor='name'>name</label>
        <input
          name='name'
          type='text'
          ref={nameInputRef}
          placeholder='Enter your name'
        />
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
        <button>Sign-Up</button>
      </form>
    </section>
  );
}

export default Signup;
