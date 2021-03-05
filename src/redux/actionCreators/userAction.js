import * as TYPES from '../types';

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

// export function addUser() {
//   return {

//   } 
// }
