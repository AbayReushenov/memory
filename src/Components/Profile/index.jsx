import React from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../../firebase/firebase';

export default function Profile() {
  const history = useHistory();
  const logOut = async () => {
    await firebase.auth().signOut().then(() => history.push('/'));
    history.push('/');
  };

  const profile = {
    name: 'Лев Николаевич Толстой',
    email: 'karenin@email.com',
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
        <li>
          e-mail:
          {profile.email}
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
