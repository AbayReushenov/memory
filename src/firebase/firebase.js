import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';

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

export function logOut() {
  firebase.auth().signOut();
}

export async function googleAuth() {
  const googleAuthScenario = new firebase.auth.GoogleAuthProvider();
  const responce = await firebase.auth().signInWithPopup(googleAuthScenario);
  return responce;
}

export async function mailAuth(email, password) {
  const responce = await firebase.auth().signInWithEmailAndPassword(email, password);
  return responce;
}

export async function registrationWithEmail(email, password) {
  const responce = await firebase.auth().createUserWithEmailAndPassword(email, password);
  return responce;
}

export async function checkAuth() {
  await firebase.auth().onAuthStateChanged((alive) => {
    if (alive) {
      console.log('авторизация жива');
    } else {
      console.log('авторизации нету');
    }
  });
}

export default firebase;
