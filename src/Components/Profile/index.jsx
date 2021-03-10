import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  signOut,
  addAvatarUserThunk,
} from '../../redux/actionCreators/userAction';

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

  const handlerChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const avatarsRef = storageRef.child('avatars');
    const fileRef = avatarsRef.child(file.name);
    await fileRef.put(file);
    const newAvatarUrl = await fileRef.getDownloadURL();
    console.log('AVATAR', newAvatarUrl);
    dispatch(addAvatarUserThunk(user, newAvatarUrl));
  };

  const profile = {
    name: user.name,
    email: user.email,
    rating: user.rating,
    money: user.money,
    avatar: user.avatar,
  };
  console.log('PROFILE', profile);
  return (
    <div className="profile">
      <ul className="profile__list">
        <li className="profile__items profile__items_avatar">
          <img
            className="profile_avatar"
            alt="profile photo"
            src={profile.avatar}
          />
          <input
            className="profile__items profile__items_add_avatar"
            type="file"
            onChange={handlerChange}
          />
        </li>
        <li className="profile__items">{profile.name}</li>
        <li className="profile__items">{profile.email}</li>
        <li className="profile__items">{profile.rating}</li>
        <li className="profile__items profile__items_money">
          {profile.money} Р.
          <Link className="profile__link_payment" to="/yourPayment">
            Пополнить кошелек
          </Link>
        </li>
      </ul>
      <button className="profile__logOut" type="button" onClick={logOut}>
        выйти
      </button>
    </div>
  );
}
