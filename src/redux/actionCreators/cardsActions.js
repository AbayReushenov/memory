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

export async function loadCards() {
  return async (dispatch, getState) => {
    const data = await firebase.database().ref('cards');
    dispatch(setCards(data));
  }
}
