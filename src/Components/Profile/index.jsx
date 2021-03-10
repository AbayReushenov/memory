import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signOut, addAvatarUserThunk } from '../../redux/actionCreators/userAction';

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
    dispatch(addAvatarUserThunk(user, newAvatarUrl ))
  };

  const profile = {
    name: user.name,
    email: user.email,
    rating: user.rating,
    money: user.money,
    avatar: user.avatar,
  };
  console.log("PROFILE", profile);
  return (
    <div className="profile">
      <ul>
        <li>
          <img style={{ borderRadius: 50, width:100, height:100 }} alt='profile photo' src={profile.avatar} />
            <input type="file" onChange={handlerChange} />
        </li>
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
