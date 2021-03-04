import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';
import initState from './initState';

const store = createStore(rootReducer, initState, composeWithDevTools());

store.subscribe(() => {
  console.log(store.getState());
  window.localStorage.setItem('auth', JSON.stringify(store.getState()));
});

export default store;
