import * as TYPES from '../types';

function cardsReducer(cards = {}, action) {
  switch (action.type) {
    case TYPES.ADD_CARD:
      return [...cards, action.payload];

    case TYPES.CHANGE_CARD:
      return cards.map((el) => {
        if (el.uid === action.payload.uid) {
          return action.payload;
        }
        return el;
      });

    case TYPES.DELETE_CARD:
      return cards.filter((el) => String(el.uid) !== String(action.payload));

    case TYPES.LOAD_CARDS:
      return [...action.payload];

    case TYPES.ADD_INVITE_FOR_CARD:
      return cards.map((el) => {
        if (el.uid === action.payload.uid) {
          return action.payload;
        }
        return el;
      });

    case TYPES.REMOVE_INVITE_FOR_CARD:
      return cards.map((el) => {
        if (el.uid === action.payload.uid) {
          return action.payload;
        }
        return el;
      });
    default:
      return cards;
  }
}

export default cardsReducer;
