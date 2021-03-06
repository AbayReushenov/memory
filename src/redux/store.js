import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import initState from './initState';

const store = createStore( rootReducer, initState, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => {
  console.log(store.getState());
  window.localStorage.setItem('auth', JSON.stringify(store.getState()));
});

export default store;
