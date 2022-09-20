import { useRef } from 'react';

function Login() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  function onLoginHandler(e) {
    e.preventDefault();
    // pass the email and password inputs to store
    const loginUser = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };
  }

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
