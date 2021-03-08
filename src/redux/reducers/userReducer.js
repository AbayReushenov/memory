import * as TYPES from '../types';

function userReducer(user = {}, action) {
  switch (action.type) {
    case TYPES.SIGN_IN:
      return action.payload
    case TYPES.ADD_MONEY:
      return { ...user, money: Number(action.payload.addMoney) };

    case TYPES.SIGN_OUT:
      return {};

    default:
      return user;
  }
}

// export function loadUsers

export default userReducer;
