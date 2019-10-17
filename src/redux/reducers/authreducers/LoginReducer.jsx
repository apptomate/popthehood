import * as types from '../../actions/ActionTypes.jsx';
import { arrayInitial } from '../../InitialState.jsx';

export default function authLogin(state = arrayInitial, action) {
  const { type, payload } = action;
  switch (type) {
  case types.LOGIN_SUCCESS:
    return payload;
  case types.LOGIN_ERROR:
    return payload;
  default:
    return state;
  }
}
