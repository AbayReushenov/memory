import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import store from './redux/store';
import App from './App';

const configFireBase = {
  apiKey: 'AIzaSyCTFtbayO93sLn5UfGqqVPZHZlEZjIPyy8',
  authDomain: 'memory-92db6.firebaseapp.com',
  databaseURL: 'https://memory-92db6-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'memory-92db6',
  storageBucket: 'memory-92db6.appspot.com',
  messagingSenderId: '276133046726',
  appId: '1:276133046726:web:380609d37c5c7d4eb92ac7',
};

firebase.initializeApp(configFireBase);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

const database = firebase.database();

export { firebase, database as default };
