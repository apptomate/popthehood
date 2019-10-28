import * as types from '../../actions/ActionTypes.jsx';
import { singleObjectInitial } from '../../InitialState.jsx';
import swal from 'sweetalert2';
import { getAlertToast } from '../../../views/common/helpers/functions.jsx';
export default function deleteVehicle(state = singleObjectInitial, action) {
  const { type, payload } = action;
  switch (type) {
  case types.DELETEVEHICLE_SUCCESS:
    swal.fire(getAlertToast('success', 'Deleted Successfully'));
    return {
      data: payload,
      loading: false,
      error: false,
      isLogin: true
    };
  case types.DELETEVEHICLE_LOADING:
    return { loading: true, error: false };
  case types.DELETEVEHICLE_ERROR:
    swal.fire(getAlertToast('error', payload));
    return { error: true, loading: false };
  default:
    return state;
  }
}
