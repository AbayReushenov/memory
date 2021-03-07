import * as TYPES from '../types';
import firebase from 'firebase';

export function signIn(user) {
  return {
    type: TYPES.SIGN_IN,
    payload: user,
  };
}

export function signOut() {
  return {
    type: TYPES.SIGN_OUT,
  };
}

export const addMoneyUser = (id, money) => ({
  type: TYPES.ADD_MONEY,
  money: money,
});

export const addMoneyUserByThunk = (id, money) => {
  alert(id)
  alert(money)
  const dbase = firebase.database();
  return (dispatch) => {
    alert(' 44444444444')
    return dbase
      .ref(`user/${id}`)
      .update({money: money})
      .then(() => {
        alert('Ok');
        dispatch(addMoneyUser(id, money));
      })
      .catch((err=>{
        alert('Errror !!!', err);
      }));
  };
};

// export function addUser() {
//   return {

//   }
// }
