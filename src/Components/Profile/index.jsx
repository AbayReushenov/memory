import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signOut } from '../../redux/actionCreators/userAction';

export default function Profile() {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const logOut = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => history.push('/'));
    dispatch(signOut());
    history.push('/');
  };

  const profile = {
    name: user.name,
    email: user.email,
    rating: user.rating,
    money: user.money,
  };
  return (
    <div className="profile">
      <ul>
        <li>
          Имя:
          {profile.name}
        </li>
        <li> e-mail: {profile.email}</li>
        <li>
          Рейтинг:
          {profile.rating}
        </li>
        <li>
          Сумма средств:
          {profile.money}
        </li>
      </ul>
      <Link className="navigation_link" to="/yourPayment">
        Пополнить кошелек
      </Link>
      <button type="button" onClick={logOut}>
        выйти
      </button>
    </div>
  );
}
