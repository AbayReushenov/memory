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
        money: Number(0),
      };

    case TYPES.ADD_MONEY:
      //alert(action.payload.addMoney)
      return { ...user, money: Number(action.payload.addMoney)} ;

    case TYPES.SIGN_OUT:
      return {};

    default:
      return user;
  }
}

// export function loadUsers

export default userReducer;
