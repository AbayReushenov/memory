import * as TYPES from '../types';

function userReducer(user = {}, action) {
  switch (action.type) {
    case TYPES.SIGN_IN:
      return action.payload;

    case TYPES.ADD_MONEY:
      return {
        ...user,
        money: Number(user.money) + Number(action.payload),
      };

    case TYPES.ADD_AVATAR:
      return {
        ...user,
        avatar: action.payload.avatarUrl,
      };

    case TYPES.SIGN_OUT:
      return {};

    case TYPES.ADD_INVITE_FOR_USER:
      return {
        ...user,
        invite: [...(user.invite ?? []), action.payload],
      };
    case TYPES.REMOVE_INVITE_FOR_USER:
      return {
        ...user,
        invite: user.invite.filter((el) => el !== action.payload),
      };
    case TYPES.ADD_WORKER_FOR_USER:
      return {
        ...user,
        worker: [...user.worker, action.payload],
      };
    case TYPES.ADD_REVIEW:
      return {
        ...user,
        comments: [...user.comments, action.payload],
      }

    default:
      return user;
  }
}

export default userReducer;
