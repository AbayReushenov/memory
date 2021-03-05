import React from 'react';
import firebase from 'firebase';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

export default function Login() {

  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = async (data) => {
    console.log('submit');
    try {
      await firebase.auth().signInWithEmailAndPassword(data.Email, data.password);
      history.push('/');
    } catch (error) {
      history.push('/login');
    }
  };

  const googleAuthorisation = async () => {
    try {
      const googleScenario = new firebase.auth.GoogleAuthProvider();
      const responce = await firebase.auth().signInWithPopup(googleScenario);
      console.log(responce);
      history.push('/');
    } catch (error) {
      console.log(error);
      history.push('/login');
    }
  };

  const logOut = async () => {
    await firebase.auth().signOut();
    history.push('/login');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Email" name="Email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
        {errors.Email && 'Your input is required'}
        <input type="password" placeholder="password" name="password" ref={register({ required: true, maxLength: 80 })} />
        <button type="submit">Enter</button>
      </form>
      <button type="button" onClick={() => googleAuthorisation()}>Authorisation with Google</button>
      <button type="button" onClick={logOut}>logout</button>
    </div>
  );
}
