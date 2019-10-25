import * as types from '../../actions/ActionTypes.jsx';
import { arrayInitial } from '../../InitialState.jsx';
import swal from 'sweetalert2';
import { getAlertToast } from '../../../views/common/helpers/functions.js';
export default function updateVehicleService(state = arrayInitial, action) {
  const { type, payload } = action;
  switch (type) {
  case types.UPDATEVEHICLESERVICE_LOADING:
    return { data: payload, error: false, loading: true };
  case types.UPDATEVEHICLESERVICE_SUCCESS:
    swal.fire(getAlertToast('success', 'Updated Successfully'));
    return { data: payload, loading: false, error: false };
  case types.UPDATEVEHICLESERVICE_ERROR:
    return { data: payload, error: true, loading: false };
  default:
    return { state };
  }
}
