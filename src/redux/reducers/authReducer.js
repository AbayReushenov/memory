import * as TYPES from '../types';

function authReducer(auth = {}, action) {
  switch (action.type) {
    case TYPES.SIGN_IN:
      return action.payload;

    case TYPES.SIGN_OUT:
      return null;

    default:
      return auth;
  }
}

export default authReducer;
