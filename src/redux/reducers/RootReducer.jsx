import { combineReducers } from 'redux';
import authLogin from './authreducers/LoginReducer';

const RootReducer = combineReducers({
  authLogin: authLogin
});

export default RootReducer;
