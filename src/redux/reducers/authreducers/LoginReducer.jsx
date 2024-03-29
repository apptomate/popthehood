import * as types from '../../actions/ActionTypes.jsx';
import { objectInitial } from '../../InitialState.jsx';
import swal from 'sweetalert2';
import { getAlertToast } from '../../../views/common/helpers/functions.jsx';

export default function authLogin(state = objectInitial, action) {
  const { type, payload } = action;
  switch (type) {
  case types.LOGIN_SUCCESS:
    if (!payload.error) {
      swal.fire(getAlertToast('success', 'Login Success'));
      localStorage.setItem('token', payload.token);
      localStorage.setItem('isLogin', true);
      localStorage.setItem('userData', JSON.stringify(payload.user));
    }
    if (payload.user.role !== 'Admin') {
      localStorage.setItem('isLogin', false);
      swal.fire(getAlertToast('error', 'Invalid user'));
      return { ...payload, loading: false, error: true, isLogin: false };
    }
    return { ...payload, loading: false, error: false, isLogin: true };
  case types.LOGIN_ERROR:
    if (payload.error) {
      localStorage.setItem('isLogin', false);
      swal.fire(getAlertToast('error', payload.error.message));
    }
    return { ...payload, loading: false, error: true, isLogin: false };
  case types.LOGIN_LOADING:
    return { loading: true, error: false };
  default:
    return state;
  }
}
