import React, { useEffect } from 'react';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import MainPage from './Components/MainPage';
import { signIn } from './redux/actionCreators/userAction';
import { loadCards } from './redux/actionCreators/cardsActions';
import './App.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('load card');
    firebase.auth().onAuthStateChanged((user) => {
      if (user.uid) {
        dispatch(signIn(user));
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
