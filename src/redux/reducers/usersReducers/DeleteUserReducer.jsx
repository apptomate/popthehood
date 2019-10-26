import * as types from '../../actions/ActionTypes.jsx';
import { arrayInitial } from '../../InitialState.jsx';
import { getAlertToast } from '../../../views/common/helpers/functions.js';
import swal from 'sweetalert2';
export default function deleteUser(state = arrayInitial, action) {
  const { type, payload } = action;
  switch (type) {
  case types.DELETEUSER_SUCCESS:
    swal.fire(getAlertToast('success', 'Deleted Successfully'));
    return { data: payload, loading: false, error: false };
  case types.DELETEUSER_ERROR:
    swal.fire(getAlertToast('error', payload));
    return { data: payload, error: true, loading: false };
  default:
    return state;
  }
}
