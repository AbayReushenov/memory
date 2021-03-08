import * as TYPES from '../types';

function userReducer(user = {}, action) {
  console.log('reducer', action);
  switch (action.type) {
    case TYPES.SIGN_IN:
      return {
        uid: action.payload.uid,
        email: action.payload.email,
        name: action.payload.name,
        money: action.payload.money,
        rating: action.payload.rating,
      };

    case TYPES.ADD_MONEY:
      return { ...user, money: Number(user.money) + Number(action.payload.money) };

    case TYPES.SIGN_OUT:
      return {};

    default:
      return user;
  }
}

export default userReducer;
