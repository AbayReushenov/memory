import React from 'react';
import './styles.css';
import firebase from 'firebase';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import CloseForm from '../../image/closeForm.png';

export default function Login(props) {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.Email, data.password);
      history.push('/');
    } catch (error) {
      history.push('/login');
    }
  };

  const googleAuthorisation = async () => {
    try {
      const googleScenario = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(googleScenario);
      history.push('/');
    } catch (error) {
      history.push('/login');
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
        <input
          type="text"
          placeholder="Email"
          className="form_auth_input"
          name="Email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.Email && 'Your input is required'}
        <input
          type="password"
          placeholder="password"
          className="form_auth_input"
          name="password"
          ref={register({ required: true, maxLength: 80 })}
        />
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
