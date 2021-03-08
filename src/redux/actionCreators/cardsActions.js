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

export function deleteCard(uid) {
  return {
    type: TYPES.DELETE_CARD,
    payload: uid,
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
      const populatedCardsWithUid = Object.values(firebaseData ?? {});
      dispatch(setCards(populatedCardsWithUid));
    });
  };
}

export function addCardFireBase(incomingData) {
  return (dispatch) => {
    const {
      task,
      titleCard,
      descriptionCard,
      locationCard,
      dateFinalTask,
      priceCard,
      user,
    } = incomingData;
    console.log(task);
    const newCardId = firebase.database().ref().child('cards').push().key;
    const data = {
      uid: newCardId,
      title: titleCard,
      description: descriptionCard,
      loaction: locationCard,
      task,
      dateFinalTask,
      price: priceCard,
      status: 'search',
      author: user.uid,
    };
    dispatch(addCard({ ...data, uid: newCardId }));
    let updates = {};
    updates['/cards/' + newCardId] = data;
    firebase.database().ref().update(updates);
  };
}

export function deleteCardFireBase(cardUid) {
  return async (dispatch) => {
    await firebase
      .database()
      .ref('cards/' + cardUid)
      .remove();
    dispatch(deleteCard(cardUid));
  };
}
export function addInvite(card) {
  return {
    type: TYPES.ADD_INVITE_FOR_CARD,
    payload: card,
  };
}

export function addInviteFireBaseCard(card, user) {
  return async (dispatch) => {
    const update = {};
    const inviteArray = card.invite ?? [];
    const data = { ...card, invite: [...inviteArray, user] };
    update['cards/' + card.uid] = data;
    await firebase.database().ref().update(update);
    dispatch(addInvite(data));
  };
}

export function removeInvite(card) {
  return {
    type: TYPES.REMOVE_INVITE_FOR_CARD,
    payload: card,
  };
}

export function removeInviteFireBaseCard(card, userUid) {
  return async (dispatch) => {
    const update = {};
    let inviteArray = card.invite ?? [];
    inviteArray = inviteArray.filter((el) => el.uid !== userUid);
    const data = { ...card, invite: inviteArray };
    update['cards/' + card.uid] = data;
    await firebase.database().ref().update(update);
    dispatch(removeInvite(data));
  };
}

export function changeFireBaseCard(card, newData) {
  return async (dispatch) => {
    console.log('card actions new data card', newData);
    const update = {};
    const data = { ...card, ...newData };
    update['cards/' + card.uid] = data;
    await firebase.database().ref().update(update);
    dispatch(changeCard(data));
  };
}