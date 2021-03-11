import React, { useState } from 'react';
import './styles.css';
import firebase from 'firebase';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import CloseForm from '../../image/closeForm.png';

export default function Login(props) {
  const { register, handleSubmit, errors } = useForm();
  const [errorAuth, seterrorAuth] = useState(false);
  const history = useHistory();

  const onSubmit = async (data) => {
    console.log('submit');
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.Email, data.password);
      history.push('/');
    } catch (error) {
      seterrorAuth('Проверьте имя пользователя и пароль');
    }
  };

  const googleAuthorisation = async () => {
    try {
      const googleScenario = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(googleScenario);
      history.push('/');
    } catch (error) {
      console.log(error);
      seterrorAuth('Проверьте имя пользователя и пароль');
    }
  };
  const handlerCloseForm = () => {
    props.setviewLoginForm(false);
  };

  return (
    <form className="form_auth" onSubmit={handleSubmit(onSubmit)}>
      <button
        className="form_auth_close_btn"
        type="button"
        onClick={handlerCloseForm}
      >
        <img
          src={CloseForm}
          alt="Кнопка закрытия формы"
          className="form_auth_close_icons"
        />
      </button>
      <h2 className="form_auth_title">Добро пожаловать</h2>
      <div className="form_auth_user_data">
        {errors.Email && 'А где почта?'}
        <input
          type="text"
          placeholder="Email"
          className="form_auth_input"
          name="Email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.password && 'А где пароль и не больше 20 символов'}
        <input
          type="password"
          placeholder="password"
          className="form_auth_input"
          name="password"
          ref={register({ required: true, maxLength: 20 })}
        />
      {errorAuth && <p>{errorAuth}</p>}
      </div>
      <div className="form_auth_action">
        <button
          className="form_auth_action_btn form_auth_action_btn_email"
          type="submit"
        >
          Войти
        </button>
        <button
          className="form_auth_action_btn form_auth_action_btn_google"
          type="button"
          onClick={() => googleAuthorisation()}
        >
          Войти через Google
        </button>
      </div>
    </form>
  );
}
