import * as TYPES from '../types';

  function cardsReducer(cards = {}, action) {
    console.log('cards reducer', action);
    switch (action.type) {
      case TYPES.ADD_CARD:
        console.log(action);
        return [...cards, action.payload ];

      case TYPES.CHANGE_CARD:
        return [cards.map(el => String(el.id) === String(action.payload.data.id) ? { ...el, ...action.payload.data } : el)];

      case TYPES.DELETE_CARD:
      return [cards.filter(el => String(el.id) === String(action.payload.id))]

      case TYPES.LOAD_CARDS:
        console.log('TYPES.LOAD_CARDS');
      return [ ...action.payload]

      default:
        return cards;
    }
  }

export default cardsReducer;
