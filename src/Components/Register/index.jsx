import React from 'react';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { signIn } from '../../redux/actionCreators/userAction';

export default function Register() {
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const user = await firebase.auth().createUserWithEmailAndPassword(data.Email, data.password);
    console.log('register===>', user.user.uid);
    dispatch(signIn(user.user.uid));
    history.push('/');
  };

  const onError = (errorss, e) => console.log(errorss, e);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <input type="text" placeholder="First name" name="First name" ref={register({ required: true, maxLength: 80 })} />
        <input type="text" placeholder="Last name" name="Last name" ref={register({ required: true, maxLength: 100 })} />
        <input type="text" placeholder="Email" name="Email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
        <input type="tel" placeholder="Mobile number" name="Mobile number" ref={register({ required: true, minLength: 6, maxLength: 12 })} />
        <input type="password" placeholder="password" name="password" ref={register({ required: true, minLength: 6, maxLength: 12 })} />
        <select name="Title" ref={register({ required: true })}>
          <option value="male">муж</option>
          <option value="female">женск</option>
        </select>
        <input type="submit" />
      </form>
    </div>
  );
}
