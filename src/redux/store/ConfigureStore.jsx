import { createStore, applyMiddleware, compose } from 'redux';
import RootReducer from '../reducers/RootReducer.jsx';
import thunk from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  return createStore(RootReducer, composeEnhancers(applyMiddleware(thunk)));
}
