import { combineReducers } from 'redux';
import authReducer from './userReducer';
import cardsReducer from './cardsReducer';

const rootReducer = combineReducers({
  user: authReducer,
  cards: cardsReducer,
});

export default rootReducer;
