import React from 'react';
import './styles.css';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

export default function Login(props) {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = async (data) => {
    console.log('submit');
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
      console.log(error);
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
        X
      </button>
      <h2 className="auth_title">Добро пожаловать</h2>
      <div className="form_auth_input_div">
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
      <p className="link_register">
        Нет аккаунта?{' '}
        <Link className="link_register link_register_active" to="/register">
          Зарегестрируйся!
        </Link>
      </p>
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
