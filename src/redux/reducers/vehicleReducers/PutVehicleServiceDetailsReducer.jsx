import * as types from '../../actions/ActionTypes.jsx';
import { arrayInitial } from '../../InitialState.jsx';
export default function updateVehicleService(state = arrayInitial, action) {
  const { type, payload } = action;
  switch (type) {
  case types.UPDATEVEHICLESERVICE_LOADING:
    return { data: payload, error: false, loading: true };
  case types.UPDATEVEHICLESERVICE_SUCCESS:
    return { data: payload, loading: false, error: false };
  case types.UPDATEVEHICLESERVICE_ERROR:
    return { data: payload, error: true, loading: false };
  default:
    return { state };
  }
}
