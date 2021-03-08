import React, { useEffect } from 'react';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import MainPage from './Components/MainPage';
import { signIn } from './redux/actionCreators/userAction';
import { loadCards } from './redux/actionCreators/cardsActions';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const dataBase = firebase.database();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dataBase
          .ref('users')
          .child(user.uid)
          .once('value', (snapshot) => {
            if (snapshot.exists()) {
              dispatch(signIn(snapshot.val()));
            } else {
              const newUser = {
                uid: user.uid,
                name: user?.displayName,
                email: user.email,
                rating: 0,
                money: 0,
                invite: '',
                work: '',
                avatar: '',
              };
              dataBase.ref('users/' + user.uid).set(newUser);
              dispatch(signIn(newUser));
            }
          });
        dispatch(loadCards());
      }
    });
  }, []);

  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

export default App;
