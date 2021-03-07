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

export const addMoneyUserByThunk = ((addMoney)=> async (/* dispatch */) =>{
  alert(addMoney)
  const dbase = firebase.database();

  await dbase
  .ref()
  .once('value')
  .then((snapshot) => {
    const datatata = snapshot.val();
    alert(datatata)
    console.log('user ===============>>>>>>>>>', datatata);
    alert(datatata)
  })
  .catch((err) => {
    console.log('Erroor------------------------->', err);
  });
  await alert(addMoney);
  // await dbase.ref().update( 
  //   {
  //     'user/money':addMoney,
  //   }
  //    );
  // await dispatch(addMoneyUser(addMoney));
  });



// export function addUser() {
//   return {

//   }
// }
