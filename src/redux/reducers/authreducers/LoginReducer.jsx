import * as types from '../../actions/ActionTypes.jsx';
import { arrayInitial } from '../../InitialState.jsx';
import Swal from 'sweetalert2';
import { getAlertToast } from '../../../views/common/helpers/functions.js';

export default function authLogin(state = arrayInitial, action) {
  const { type, payload } = action;
  switch (type) {
  case types.LOGIN_SUCCESS:
    if (!payload.error) {
      localStorage.setItem('token', payload.token);
      localStorage.setItem('isLogin', true);
      localStorage.setItem('userData', JSON.stringify(payload.user));
    }
    return { ...payload, loading: false, error: false, isLogin: true };
  case types.LOGIN_ERROR:
    if (payload.error) {
      localStorage.setItem('isLogin', false);
      Swal.fire(
        getAlertToast('error', 'Invalid user' || 'payload.error.message')
      );
    }
    return { ...payload, loading: false, error: true, isLogin: false };
  case types.LOGIN_LOADING:
    return { loading: true, error: false };
  default:
    return state;
  }
}
