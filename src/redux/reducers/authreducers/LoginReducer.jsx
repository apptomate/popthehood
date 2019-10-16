import * as types from '../../actions/ActionTypes.jsx';
import { arrayInitial } from '../../InitialState.jsx';

export default function authLogin(state = arrayInitial, action) {
  const { type, payload } = action;
  switch (type) {
  case types.LOGIN_SUCCESS:
    console.error(payload);
    return payload;
  case types.LOGIN_ERROR:
    console.error('check' + payload);
    return payload;
  default:
    return state;
  }
}
