import * as TYPES from '../types';

function authReducer(auth = {}, action) {
  switch (action.type) {
    case TYPES.SIGN_IN:
      return { ...auth, uid: action.payload };

    case TYPES.SIGN_OUT:
      return {};

    default:
      return auth;
  }
}

export default authReducer;
