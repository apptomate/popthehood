import * as types from '../../actions/ActionTypes.jsx';
import { arrayInitial } from '../../InitialState.jsx';
import swal from 'sweetalert2';
import { getAlertToast } from '../../../views/common/helpers/functions.js';

export default function updateUser(state = arrayInitial, action) {
  const { type, payload } = action;
  switch (type) {
  case types.UPDATEUSER_SUCCESS:
    swal.fire(getAlertToast('success', 'Updated Successfully'));
    return { data: payload, loading: false, error: false };
  case types.UPDATEUSER_ERROR:
    swal.fire(getAlertToast('error', payload));
    return { data: payload, error: true, loading: false };
  default:
    return state;
  }
}
