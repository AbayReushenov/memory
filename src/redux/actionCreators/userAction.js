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

export function addMoneyUser(addMoney) {
  return {
    type: TYPES.ADD_MONEY,
    payload: {
      addMoney,
    },
  };
}

export const addMoneyUserByThunk = ((addMoney)=> async (dispatch) =>{
  const dbase = firebase.database();
  await alert(addMoney);
  await dbase.ref('user/money').set( addMoney );
  dispatch(addMoneyUser(addMoney));
  });



// export function addUser() {
//   return {

//   }
// }
