import * as TYPES from '../types';
import firebase from 'firebase';

export function addCard(data) {
  return {
    type: TYPES.ADD_CARD,
    payload: data,
  };
}

export function changeCard(data) {
  return {
    type: TYPES.CHANGE_CARD,
    payload: data,
  };
}

export function deleteCard(id) {
  return {
    type: TYPES.CHANGE_CARD,
    payload: id,
  };
}

export function setCards(data) {
  return {
    type: TYPES.LOAD_CARDS,
    payload: data,
  };
}

export function loadCards() {
  return (dispatch) => {
    const result = firebase.database().ref('cards');
    result.on('value', (snapshot) => {
      console.log('=======>action creator');
      const firebaseData = snapshot.val();
      console.log('=======>action creator');
      let setData = [];
      Object.keys(firebaseData).forEach(el => setData.push(firebaseData[el]));
      // for (let key in asd) {
      //   b.push(asd[key])
      //   console.log(asd[key]);
      // }
      dispatch(setCards(setData))
    })
  }
}
