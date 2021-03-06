import * as TYPES from '../types';
import firebase from 'firebase';
import { changeFireBaseCard } from '../actionCreators/cardsActions'

//логирование в редаксе
export function signIn(user) {
  return {
    type: TYPES.SIGN_IN,
    payload: user,
  };
}

//разлогирование в редаксе
export function signOut() {
  return {
    type: TYPES.SIGN_OUT,
  };
}


//добавление денег клиенту в редаксе
export function addMoneyUser( money) {
  return {
    type: TYPES.ADD_MONEY,
    payload: money
  };
}

export function addAvatarUser(user, avatarUrl) {
  return {
    type: TYPES.ADD_AVATAR,
    payload: {
      user,
      avatarUrl,
    },
  };
}

export function addAvatarUserThunk(user, avatar) {
  return (dispatch) => {
    dispatch(addAvatarUser(user, avatar));
    firebase.database().ref('users/' + user.uid).set({
      ...user, avatar: avatar
    })
  }
}

export function addMoneyUserThunk(user, money) {
  return (dispatch) => {
    dispatch(addMoneyUser(money));
    firebase.database().ref('users/' + user.uid).set({
      ...user, money: Number(user.money) + Number(money)
    })
  }
}

export function addInvite(cardUid) {
  return {
    type: TYPES.ADD_INVITE_FOR_USER,
    payload: cardUid,
  };
}

export function addWorkerToUserFireBase(user, card) {
  return async () => {
    const update = {};
    const workerArray = user.worker ?? [];
    const data = { ...user, worker: [...workerArray, card.uid] };
    update['users/' + user.uid] = data;
    await firebase.database().ref().update(update);
  };
}

export function addInviteFireBaseUser(user, card) {
  return async (dispatch) => {
    const update = {}
    const inviteArray = user.invite ?? [];
    const data = { ...user, invite: [...inviteArray, card.uid] };
    update['users/' + user.uid] = data;
    await firebase.database().ref().update(update)
    dispatch(addInvite(card.uid));
  }
}


export function removeInvite(cardUid) {
  return {
    type: TYPES.REMOVE_INVITE_FOR_USER,
    payload: cardUid,
  };
}

export function removeInviteFireBaseUser(user, cardUid) {
  return async (dispatch) => {
    const update = {};
    let inviteArray = user.invite ?? [];
    inviteArray = inviteArray.filter((el) => el !== cardUid);
    const data = { ...user, invite: inviteArray };
    update['users/' + user.uid] = data;
    await firebase.database().ref().update(update);
    dispatch(removeInvite(cardUid));
  };
}

export function transferMoney(card) {
  return async (dispatch) => {
      dispatch(addMoneyUserThunk(card.worker, card.price));
      dispatch(changeFireBaseCard(card, { status: 'finish' }));
  }
}
