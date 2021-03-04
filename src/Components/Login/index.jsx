import React from 'react';
import { useForm } from 'react-hook-form';
// import firebase from 'firebase/app';
import * as fire from '../../firebase/firebase';

export default function Login() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    console.log('submit');
    const user = await fire.mailAuth(data.Email, data.password);
    console.log(user);
  };

  const googleAuthorisation = async () => {
    const user = await fire.googleAuth();
    console.log(user);

    // const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    // const responce = await firebase.auth().signInWithPopup(googleAuthProvider);
    // console.log(responce);
  };

  const logOut = async () => {
    const responce = await fire.logOut();
    console.log('logOut', responce);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Email" name="Email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
      {errors.Email && 'Your input is required'}
      <input type="password" placeholder="password" name="password" ref={register({ required: false, maxLength: 80 })} />
      <button type="submit">ченить</button>
      <button type="button" onClick={() => googleAuthorisation()}>Authorisation with Google</button>
      <button type="button" onClick={logOut}>logout</button>
    </form>
  );
}
