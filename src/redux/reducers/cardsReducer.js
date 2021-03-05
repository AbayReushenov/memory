import * as TYPES from '../types';

  function cardsReducer(cards = {}, action) {
    console.log('cards reducer', action);
    switch (action.type) {
      case TYPES.ADD_CARD:
        return [...cards, { ...action.payload.data }];

      case TYPES.CHANGE_CARD:
        return [cards.map(el => String(el.id) === String(action.payload.data.id) ? { ...el, ...action.payload.data } : el)];

      case TYPES.DELETE_CARD:
      return [cards.filter(el => String(el.id) === String(action.payload.id))]

      default:
        return cards;
    }
  }

export default cardsReducer;
