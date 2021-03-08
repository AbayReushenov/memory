import React, { useEffect } from 'react';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import MainPage from './Components/MainPage';
import { signIn } from './redux/actionCreators/userAction';
import { loadCards } from './redux/actionCreators/cardsActions';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const database = firebase.database();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('user auth check', user);
      if (user?.uid) {
        database.ref('users').child(user.uid).once('value', (snapshot) => {
          if (snapshot.exists()) {
            console.log('проверка наличия в базе', snapshot.val(), 'сам юзер', user);
            dispatch(signIn(snapshot.val()));
          } else {
            const newUser = {
              name: user.displayName,
              email: user.email,
              money: 0,
              rating: 0,
              uid: user.uid
            }
            database.ref('users/' + user.uid).set(newUser);
            dispatch(signIn(newUser));
          }
        })
        dispatch(loadCards());
      }
    })
    
  }, []);
  // if (snapshot.existst()) {
  //   console.log('проверка наличия в базе',snapshot.val());
  //   dispatch(signIn(snapshot.val()));
  // } else {
  //   database.ref('users/' + user.uid).set({
  //     name:user.displayName,
  //     email:user.email,
  //     money:0,
  //     rating:0,
  //   })
  // }
  // dispatch(signIn(user));

  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

export default App;
