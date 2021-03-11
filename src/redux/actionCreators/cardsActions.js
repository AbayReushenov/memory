import * as TYPES from '../types';
import firebase from 'firebase';
import { addMoneyUserThunk } from '../actionCreators/userAction';
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
    result.on('value', (snapshot) => {
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
      title,
      description,
      location,
      dateFinalTask,
      price,
      user,
    } = incomingData;
    const newCardId = firebase.database().ref().child('cards').push().key;
    const data = {
      uid: newCardId,
      title,
      description,
      location,
      task,
      dateFinalTask,
      price,
      status: 'search',
      author: user.uid,
    };
    dispatch(addCard({ ...data, uid: newCardId }));
    dispatch(addMoneyUserThunk(user, -price));
    let updates = {};
    updates['/cards/' + newCardId] = data;
    firebase.database().ref().update(updates);
  };
}

export function deleteCardFireBase(user, card) {
  return async (dispatch) => {
    await firebase
      .database()
      .ref('cards/' + card.uid)
      .remove();
    dispatch(deleteCard(card.uid));
    dispatch(addMoneyUserThunk(user, card.price));

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
    const update = {};
    const data = { ...card, ...newData };
    update['cards/' + card.uid] = data;
    await firebase.database().ref().update(update);
    dispatch(changeCard(data));
  };
}
