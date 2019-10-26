import * as types from '../../actions/ActionTypes.jsx';
import { arrayInitial } from '../../InitialState.jsx';
import swal from 'sweetalert2';
import { getAlertToast } from '../../../views/common/helpers/functions.js';
export default function updateVehicle(state = arrayInitial, action) {
  const { type, payload } = action;
  switch (type) {
  case types.UPDATEVEHICLE_SUCCESS:
    swal.fire(getAlertToast('success', 'Updated Successfully'));
    return { data: payload, loading: false, error: false };
  case types.UPDATEVEHICLE_ERROR:
    swal.fire(getAlertToast('error', payload));
    return { data: payload, error: true, loading: false };
  default:
    return state;
  }
}
