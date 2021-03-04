import * as TYPES from '../types';

export function signIn(user) {
  console.log('action', user);
  return {
    type: TYPES.SIGN_IN,
    payload: user,
  };
}

export function signOut() {
  console.log('action signOut');
  return {
    type: TYPES.SIGN_OUT,
  };
}
