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
    firebase
      .database()
      .ref('cards')
      .once('value')
      .then((snapshot) => {
        const firebaseData = snapshot.val();
        console.log('=======>action creator');
        let setData = [];
        Object.keys(firebaseData).forEach((el) =>
          setData.push(firebaseData[el])
        );
        dispatch(setCards(setData));
      })
      .catch((err) => {
        console.log('Error', err);
      });
  };
}
