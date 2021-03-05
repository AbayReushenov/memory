import * as TYPES from '../types';

function userReducer(user = {}, action) {
  console.log('reducer', action);
  switch (action.type) {
    case TYPES.SIGN_IN:
      return {
        ...user,
        uid: action.payload.uid,
        email: action.payload.email,
        name: action.payload.displayName,
      };

    case TYPES.SIGN_OUT:
      return {};

    default:
      return user;
  }
}

// export function loadUsers 

export default userReducer;
