import React, { useEffect } from 'react';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import MainPage from './Components/MainPage';
import { signIn } from './redux/actionCreators/authAction';
import './App.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user.uid) {
        console.log(user.uid);
        console.log(signIn);
        dispatch(signIn(user.uid));
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
