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
    result.once('value', (snapshot) => {
      const firebaseData = snapshot.val();
      const populatedCardsWithUid = Object.values(firebaseData??{})
      dispatch(setCards(populatedCardsWithUid));
    })
  }
}

export function addCardFireBase(incomingData) {
  return (dispatch) => {
    const { task, titleCard, descriptionCard, locationCard, dateFinalTask, priceCard, user } = incomingData;
    console.log(task);
    const newCardId = firebase.database().ref().child('cards').push().key
    const data = {
      uid: newCardId,
      title: titleCard,
      description: descriptionCard,
      loaction: locationCard,
      task,
      dateFinalTask,
      price: priceCard,
      status: 'search',
      author: user.uid
    };
    dispatch(addCard({ ...data, uid: newCardId }));
    let updates = {};
    updates['/cards/' + newCardId] = data;
    firebase.database().ref().update(updates);
    
  }
}
