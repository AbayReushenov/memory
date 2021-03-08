import * as TYPES from '../types';
import firebase from 'firebase';

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
export function addMoneyUser(user, money) {
  return {
    type: TYPES.ADD_MONEY,
    payload: {
      user,
      money,
    },
  };
}

export function addMoneyUserThunk(user, money) {
  console.log('попытка поплнения', user);
  return (dispatch) => {
    dispatch(addMoneyUser(user, money));
    firebase.database().ref('users/' + user.uid).set({
      ...user, money: Number(user.money) + Number(money)
    })
  }
}

export function addInvite(user) {
  return {
    type: TYPES.ADD_INVITE,
    payload:  user 

  }
}

export function addInviteFireBase(user, card) {
  return (dispatch) => {
    const update = {}
    const inviteArray = user.invite ?? [];
    console.log('inviteArray',inviteArray);
    inviteArray.push(card.uid);
    const data = { ...user, invite: inviteArray }
    update['users/' + user.uid] = data
    firebase.database().ref().update(update)
    dispatch(addInvite(user));
  }
}
