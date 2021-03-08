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
      const firebaseData = snapshot.val();
      const a = Object.entries(firebaseData ?? {}).map(el => {
        return {...el[1], uid: el[0]}
      });
      let setData = [];
      
      Object.keys(firebaseData ?? []).forEach(el => setData.push(firebaseData[el]));
      
      
      dispatch(setCards(a));
    })
  }
}
