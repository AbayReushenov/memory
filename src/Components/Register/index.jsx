import React from 'react';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { signIn } from '../../redux/actionCreators/userAction';
import CloseForm from '../../image/closeForm.png';

export default function Register(props) {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const dataBase = firebase.database();
  const onSubmit = async (data) => {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password);
    const a = data.lastname + ' ' + data.firstname;
    const newUser = {
      uid: user.user.uid,
      name: a,
      email: data.email,
      rating: 0,
      money: 0,
      avatar: '',
    };

    await dataBase.ref('users/' + user.user.uid).set(newUser);
    dispatch(signIn(newUser));
    history.push('/');
  };

  const handlerCloseForm = () => {
    props.setviewRegisterForm(false);
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
      <h2 className="form_auth_title">Введите данные для регистрация</h2>
      <div className="form_auth_user_data">
        <input
          type="text"
          className="form_auth_input"
          placeholder="First name"
          name="firstname"
          ref={register({ required: true, maxLength: 80 })}
        />
        <input
          type="text"
          className="form_auth_input"
          placeholder="Last name"
          name="lastname"
          ref={register({ required: true, maxLength: 100 })}
        />
        <input
          type="email"
          className="form_auth_input"
          placeholder="Email"
          name="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        <input
          type="tel"
          className="form_auth_input"
          placeholder="Mobile number"
          name="mobile_number"
          ref={register({ required: true, minLength: 6, maxLength: 12 })}
        />
        <input
          type="password"
          className="form_auth_input"
          placeholder="password"
          name="password"
          ref={register({ required: true })}
        />
        <select
          className="form_auth_input"
          name="gender"
          ref={register({ required: true })}
        >
          <option className="form_auth_input" value="male">
            муж
          </option>
          <option className="form_auth_input" value="female">
            женск
          </option>
        </select>
      </div>
      <button
        className="form_auth_action_btn form_auth_action_btn_register"
        type="submit"
      >
        Зарегестрироваться
      </button>
    </form>
  );
}
