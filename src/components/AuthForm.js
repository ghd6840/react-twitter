import React, { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const auth = getAuth();
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        //계정 생성
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        //로그인
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
          className="authInput"
        />
        <input
          type="submit"
          value={newAccount ? 'Create Account' : 'Sign In'}
          className="authInput authSubmit"
        />
        {error}
      </form>
      {error && <span className="authError">{error}</span>}
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? 'Sign In' : 'Create Account'}
      </span>
    </>
  );
};

export default AuthForm;
