import React from 'react';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signOut } from '../../redux/actionCreators/authAction';

export default function Profile() {
  const user = useSelector(state => state.user)
  const history = useHistory();
  const dispatch = useDispatch();
  const logOut = async () => {
    await firebase.auth().signOut().then(() => history.push('/'));
    dispatch(signOut());
    history.push('/');
  };

  const profile = {
    name: user.name,
    email: user.email,
    rating: 4.8,
    money: 5000,
  };
  return (
    <div className="profile">
      <ul>
        <li>
          Имя:
          {profile.name}
        </li>
        <li> e-mail: {profile.email}
        </li>
        <li>
          Рейтинг:
          {profile.rating}
        </li>
        <li>
          Сумма средств:
          {profile.money}
        </li>
      </ul>
      <button type="button" onClick={logOut}>выйти</button>
    </div>
  );
}
